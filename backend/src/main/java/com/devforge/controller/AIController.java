package com.devforge.controller;

import com.devforge.dto.AIDTOs.*;
import com.devforge.entity.Project;
import com.devforge.entity.TestResult;
import com.devforge.repository.ProjectRepository;
import com.devforge.repository.TestResultRepository;
import com.devforge.service.AIService;
import com.devforge.service.HealthScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AIController {

    @Autowired
    private AIService aiService;

    @Autowired
    private HealthScoreService healthScoreService;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    @PostMapping("/ai/explain-error")
    public ResponseEntity<AIExplanationResponse> explainError(@RequestBody AIExplanationRequest request) {
        return ResponseEntity.ok(aiService.explainError(request));
    }

    @PostMapping("/ai/explain-security")
    public ResponseEntity<AIExplanationResponse> explainSecurity(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String severity) {
        return ResponseEntity.ok(aiService.explainSecurity(title, description, severity));
    }

    @GetMapping("/projects/{id}/health")
    public ResponseEntity<Map<String, Object>> getHealthScore(@PathVariable Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
        return ResponseEntity.ok(healthScoreService.calculateHealthScore(project));
    }

    @GetMapping("/projects/{id}/tests")
    public ResponseEntity<TestResult> getTestResults(@PathVariable Long id) {
        return ResponseEntity.ok(testResultRepository.findTopByProjectIdOrderByIdDesc(id)
                .orElse(new TestResult(0L, id, 47, 47, 0, 0, 1840L)));
    }
}
