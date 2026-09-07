package com.devforge.controller;

import com.devforge.service.WebhookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/webhooks")
@CrossOrigin(origins = "*")
public class WebhookController {

    @Autowired
    private WebhookService webhookService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/github")
    public ResponseEntity<?> handleGitHubWebhook(
            @RequestHeader(value = "X-Hub-Signature-256", required = false) String signature,
            @RequestHeader(value = "X-GitHub-Event", required = false, defaultValue = "push") String eventType,
            @RequestBody String rawPayload) {

        if (!webhookService.verifySignature(rawPayload, signature)) {
            Map<String, Object> err = new HashMap<>();
            err.put("status", "UNAUTHORIZED");
            err.put("message", "Invalid X-Hub-Signature-256 HMAC signature verification.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
        }

        try {
            Map<String, Object> payloadMap = objectMapper.readValue(rawPayload, Map.class);

            if ("push".equalsIgnoreCase(eventType) || payloadMap.containsKey("commits") || payloadMap.containsKey("ref")) {
                Map<String, Object> result = webhookService.processGitHubPushEvent(payloadMap);
                return ResponseEntity.ok(result);
            }

            Map<String, Object> ack = new HashMap<>();
            ack.put("status", "IGNORED");
            ack.put("message", "Event type '" + eventType + "' acknowledged, no pipeline trigger required.");
            return ResponseEntity.ok(ack);
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("status", "ERROR");
            err.put("message", "Failed to parse GitHub webhook payload: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
        }
    }
}
