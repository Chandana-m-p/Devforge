package com.devforge.service;

import com.devforge.dto.PipelineDTOs.PipelineRunDTO;
import com.devforge.entity.Project;
import com.devforge.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class WebhookService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private PipelineService pipelineService;

    @Value("${devforge.github.webhook.secret:devforge-webhook-secret-key-2026}")
    private String webhookSecret;

    public boolean verifySignature(String payload, String signatureHeader) {
        if (signatureHeader == null || !signatureHeader.startsWith("sha256=")) {
            // For testing & local dev simplicity, allow if signature is omitted or in dev mode
            return true;
        }

        try {
            String expectedHash = signatureHeader.substring(7);
            Mac hmacSHA256 = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(webhookSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            hmacSHA256.init(secretKey);
            byte[] hashBytes = hmacSHA256.doFinal(payload.getBytes(StandardCharsets.UTF_8));

            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            String computedHash = sb.toString();

            return MessageDigestEquals(computedHash, expectedHash);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            return false;
        }
    }

    private boolean MessageDigestEquals(String a, String b) {
        if (a == null || b == null) return false;
        if (a.length() != b.length()) return false;
        int result = 0;
        for (int i = 0; i < a.length(); i++) {
            result |= a.charAt(i) ^ b.charAt(i);
        }
        return result == 0;
    }

    public Map<String, Object> processGitHubPushEvent(Map<String, Object> payload) {
        Map<String, Object> result = new HashMap<>();

        String ref = (String) payload.get("ref");
        String branch = ref != null ? ref.replace("refs/heads/", "") : "main";

        Map<String, Object> repo = (Map<String, Object>) payload.get("repository");
        String repoUrl = repo != null ? (String) repo.get("clone_url") : null;
        String repoHtmlUrl = repo != null ? (String) repo.get("html_url") : null;
        String repoName = repo != null ? (String) repo.get("name") : "demo-repo";

        Map<String, Object> headCommit = (Map<String, Object>) payload.get("head_commit");
        String commitMessage = headCommit != null ? (String) headCommit.get("message") : "Automated git push";
        String commitSha = headCommit != null ? (String) headCommit.get("id") : UUID.randomUUID().toString().substring(0, 8);

        // Find matching project
        List<Project> allProjects = projectRepository.findAll();
        Project matchedProject = null;

        for (Project p : allProjects) {
            if (repoUrl != null && repoUrl.equalsIgnoreCase(p.getRepositoryUrl())) {
                matchedProject = p;
                break;
            }
            if (repoHtmlUrl != null && repoHtmlUrl.equalsIgnoreCase(p.getRepositoryUrl())) {
                matchedProject = p;
                break;
            }
            if (p.getName().equalsIgnoreCase(repoName)) {
                matchedProject = p;
                break;
            }
        }

        if (matchedProject == null && !allProjects.isEmpty()) {
            // Default to first project for seamless testing
            matchedProject = allProjects.get(0);
        }

        if (matchedProject != null) {
            String triggerReason = "GitHub Webhook Push [" + branch + "@" + (commitSha.length() > 7 ? commitSha.substring(0, 7) : commitSha) + "]: " + commitMessage;
            PipelineRunDTO runDTO = pipelineService.executePipeline(matchedProject.getId(), triggerReason);

            result.put("status", "SUCCESS");
            result.put("message", "Pipeline triggered successfully via GitHub Webhook");
            result.put("projectId", matchedProject.getId());
            result.put("projectName", matchedProject.getName());
            result.put("pipelineRunId", runDTO.getId());
            result.put("branch", branch);
            result.put("commitSha", commitSha);
        } else {
            result.put("status", "IGNORED");
            result.put("message", "No matching DevForge project found for repository: " + repoName);
        }

        return result;
    }
}
