import { useState, useEffect, useRef, useCallback } from 'react';

export const usePipelineWebSocket = (runId = null) => {
  const [streamLogs, setStreamLogs] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeStage, setActiveStage] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  // Connect to live WebSocket STOMP/WS endpoint if available
  useEffect(() => {
    if (!runId) return;

    const wsUrl = `ws://${window.location.hostname}:8080/ws/pipeline/websocket`;
    let ws;

    try {
      ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        // STOMP CONNECT frame fallback
        const connectFrame = "CONNECT\naccept-version:1.2,1.1,1.0\nheart-beat:10000,10000\n\n\u0000";
        ws.send(connectFrame);

        // STOMP SUBSCRIBE frame to topic
        const subscribeFrame = `SUBSCRIBE\nid:sub-0\ndestination:/topic/pipeline-logs/${runId}\n\n\u0000`;
        ws.send(subscribeFrame);
      };

      ws.onmessage = (event) => {
        try {
          const body = event.data;
          if (body.includes('{') && body.includes('}')) {
            const jsonStart = body.indexOf('{');
            const jsonEnd = body.lastIndexOf('}') + 1;
            const parsed = JSON.parse(body.substring(jsonStart, jsonEnd));
            if (parsed.logLine) {
              setStreamLogs((prev) => [...prev, parsed.logLine]);
              if (parsed.stageName) setActiveStage(parsed.stageName);
            }
          }
        } catch (e) {
          // Ignore parsing errors for raw frames
        }
      };

      ws.onerror = () => {
        setIsConnected(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
      };
    } catch (e) {
      console.warn("WebSocket connection attempt failed, falling back to stream simulator.");
    }

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [runId]);

  // Simulated live telemetry streaming for interactive demos / offline testing
  const simulateLivePipelineStream = useCallback((stages, onStageChange, onComplete) => {
    setIsStreaming(true);
    setStreamLogs([]);
    let currentLineIndex = 0;

    const allLines = [];
    stages.forEach((stage) => {
      const stageLines = (stage.logs || `[${stage.stageName}] Executing stage...`).split('\n');
      stageLines.forEach((line) => {
        allLines.push({ stageName: stage.stageName, line });
      });
    });

    const interval = setInterval(() => {
      if (currentLineIndex < allLines.length) {
        const item = allLines[currentLineIndex];
        setStreamLogs((prev) => [...prev, item.line]);
        setActiveStage(item.stageName);
        if (onStageChange) onStageChange(item.stageName);
        currentLineIndex++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        if (onComplete) onComplete();
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  return {
    streamLogs,
    isStreaming,
    activeStage,
    isConnected,
    simulateLivePipelineStream,
    setStreamLogs
  };
};
