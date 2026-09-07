package com.devforge.service;

import com.devforge.entity.Project;
import com.devforge.entity.SecurityFinding;
import com.devforge.entity.TestResult;
import com.devforge.repository.SecurityFindingRepository;
import com.devforge.repository.TestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class HealthScoreService {

    @Autowired
    private SecurityFindingRepository securityFindingRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    public Map<String, Object> calculateHealthScore(Project project) {
        int buildScore = "SUCCESS".equalsIgnoreCase(project.getLastPipelineStatus()) ? 100 : 40;

        int testScore = 100;
        TestResult testResult = testResultRepository.findTopByProjectIdOrderByIdDesc(project.getId()).orElse(null);
        if (testResult != null && testResult.getTotal() > 0) {
            testScore = (testResult.getPassed() * 100) / testResult.getTotal();
        }

        List<SecurityFinding> findings = securityFindingRepository.findByProjectId(project.getId());
        int securityDeduction = 0;
        for (SecurityFinding f : findings) {
            if ("CRITICAL".equalsIgnoreCase(f.getSeverity())) securityDeduction += 25;
            else if ("HIGH".equalsIgnoreCase(f.getSeverity())) securityDeduction += 15;
            else if ("MEDIUM".equalsIgnoreCase(f.getSeverity())) securityDeduction += 8;
            else if ("LOW".equalsIgnoreCase(f.getSeverity())) securityDeduction += 3;
        }
        int securityScore = Math.max(0, 100 - securityDeduction);

        int dependencyScore = 85; // Default healthy baseline
        int containerScore = Boolean.TRUE.equals(project.getHasDockerfile()) ? 100 : 50;
        int cicdScore = 85;

        // Calculate weighted score
        // Weights: Build (25%), Tests (25%), Security (20%), Dependencies (15%), Containerization (10%), CI/CD (5%)
        double finalScoreRaw = (buildScore * 0.25) +
                               (testScore * 0.25) +
                               (securityScore * 0.20) +
                               (dependencyScore * 0.15) +
                               (containerScore * 0.10) +
                               (cicdScore * 0.05);

        int finalScore = (int) Math.round(finalScoreRaw);
        project.setHealthScore(finalScore);

        Map<String, Object> breakdown = new LinkedHashMap<>();
        breakdown.put("projectId", project.getId());
        breakdown.put("projectName", project.getName());
        breakdown.put("overallScore", finalScore);
        breakdown.put("buildScore", buildScore);
        breakdown.put("testScore", testScore);
        breakdown.put("securityScore", securityScore);
        breakdown.put("dependencyScore", dependencyScore);
        breakdown.put("containerScore", containerScore);
        breakdown.put("cicdScore", cicdScore);
        breakdown.put("recommendation", getHealthRecommendation(finalScore, securityDeduction));

        return breakdown;
    }

    private String getHealthRecommendation(int score, int securityDeduction) {
        if (score >= 90) return "Excellent repository health! Keep dependencies updated and maintain test coverage.";
        if (score >= 75) return "Good health score. Resolve minor security findings and upgrade outdated dependencies.";
        if (securityDeduction > 20) return "Action needed: High/Critical security vulnerabilities detected. Remediate findings promptly.";
        return "Build or test failures detected. Check pipeline logs and run AI error assistant for fix suggestions.";
    }
}
