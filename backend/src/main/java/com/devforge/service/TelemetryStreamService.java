package com.devforge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TelemetryStreamService {

    @Autowired(required = false)
    private SimpMessagingTemplate messagingTemplate;

    public static class LogFrame {
        private Long runId;
        private String stageName;
        private String logLine;
        private String status;
        private String timestamp;

        public LogFrame(Long runId, String stageName, String logLine, String status) {
            this.runId = runId;
            this.stageName = stageName;
            this.logLine = logLine;
            this.status = status;
            this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        }

        public Long getRunId() { return runId; }
        public String getStageName() { return stageName; }
        public String getLogLine() { return logLine; }
        public String getStatus() { return status; }
        public String getTimestamp() { return timestamp; }
    }

    public void streamLog(Long runId, String stageName, String logLine, String status) {
        LogFrame frame = new LogFrame(runId, stageName, logLine, status);
        if (messagingTemplate != null) {
            messagingTemplate.convertAndSend("/topic/pipeline-logs/" + runId, frame);
            messagingTemplate.convertAndSend("/topic/pipeline-logs", frame);
        }
    }
}
