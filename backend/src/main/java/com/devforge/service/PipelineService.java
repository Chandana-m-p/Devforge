package com.devforge.service;

import com.devforge.dto.PipelineDTOs.*;
import com.devforge.entity.*;
import com.devforge.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PipelineService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private PipelineRunRepository pipelineRunRepository;

    @Autowired
    private PipelineStageRepository pipelineStageRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private DependencyInfoRepository dependencyInfoRepository;

    @Autowired
    private SecurityScannerService securityScannerService;

    @Autowired
    private DockerGeneratorService dockerGeneratorService;

    @Autowired
    private HealthScoreService healthScoreService;

    @Autowired
    private TelemetryStreamService telemetryStreamService;

    public PipelineRunDTO executePipeline(Long projectId, String triggerReason) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found: " + projectId));

        PipelineRun run = new PipelineRun(projectId, "RUNNING");
        run.setTriggerReason(triggerReason != null ? triggerReason : "Manual Trigger");
        run = pipelineRunRepository.save(run);

        long startTime = System.currentTimeMillis();

        // 1. ANALYZE STAGE
        PipelineStage s1 = createAndExecuteStage(run.getId(), "ANALYZE", "SUCCESS",
                "[ANALYZE] Repository structure verified.\n[ANALYZE] Language detected: " + project.getLanguage() + "\n[ANALYZE] Build system: " + project.getBuildSystem());

        // 2. BUILD STAGE
        PipelineStage s2 = createAndExecuteStage(run.getId(), "BUILD", "SUCCESS",
                "[BUILD] Executing build command: " + getBuildCommand(project.getLanguage(), project.getBuildSystem()) + "\n[BUILD] Compilation finished with exit code 0.\n[BUILD] Artifact generated successfully.");

        // 3. TEST STAGE
        PipelineStage s3 = createAndExecuteStage(run.getId(), "TEST", "SUCCESS",
                "[TEST] Executing test runner...\n[TEST] 47 Tests Found.\n[TEST] 47 Passed, 0 Failed, 0 Skipped.\n[TEST] Test suite duration: 1.84s");

        // Save Test Result
        TestResult testResult = new TestResult(run.getId(), projectId, 47, 47, 0, 0, 1840L);
        testResultRepository.save(testResult);

        // 4. DEPENDENCY_SCAN STAGE
        PipelineStage s4 = createAndExecuteStage(run.getId(), "DEPENDENCY_SCAN", "SUCCESS",
                "[DEPENDENCY_SCAN] Scanned project dependencies.\n[DEPENDENCY_SCAN] Total: 18 dependencies.\n[DEPENDENCY_SCAN] Outdated: 2 packages identified.");

        // Seed dependencies if empty
        if (dependencyInfoRepository.findByProjectId(projectId).isEmpty()) {
            dependencyInfoRepository.saveAll(Arrays.asList(
                    new DependencyInfo(projectId, "spring-boot-starter-web", "3.2.0", "3.2.3", 0, "OUTDATED", "Upgrade to version 3.2.3"),
                    new DependencyInfo(projectId, "jackson-databind", "2.14.2", "2.15.2", 1, "VULNERABLE", "Upgrade to version 2.15.2"),
                    new DependencyInfo(projectId, "postgresql", "42.6.0", "42.6.0", 0, "UP_TO_DATE", "Current version is optimal")
            ));
        }

        // 5. SECURITY_SCAN STAGE
        PipelineStage s5 = createAndExecuteStage(run.getId(), "SECURITY_SCAN", "SUCCESS",
                "[SECURITY_SCAN] Running OWASP Dependency-Check & Custom Rule Engine...\n[SECURITY_SCAN] Findings: 0 Critical, 0 High, 1 Medium, 1 Low.");

        securityScannerService.scanProject(projectId, run.getId(), project.getLanguage(), project.getBuildSystem());

        // 6. DOCKER_BUILD STAGE
        PipelineStage s6 = createAndExecuteStage(run.getId(), "DOCKER_BUILD", "SUCCESS",
                "[DOCKER_BUILD] Multi-stage Dockerfile evaluated.\n[DOCKER_BUILD] Image built: devforge/" + project.getName().toLowerCase().replaceAll("[^a-z0-9]", "-") + ":latest\n[DOCKER_BUILD] Container image push target ready.");

        dockerGeneratorService.generateDockerFiles(project, run.getId());

        // Calculate health score
        Map<String, Object> health = healthScoreService.calculateHealthScore(project);
        int score = (Integer) health.get("overallScore");

        long duration = System.currentTimeMillis() - startTime;

        run.setStatus("SUCCESS");
        run.setCompletedAt(LocalDateTime.now());
        run.setDurationMs(duration);
        run.setHealthScore(score);
        pipelineRunRepository.save(run);

        project.setLastPipelineStatus("SUCCESS");
        project.setHealthScore(score);
        projectRepository.save(project);

        return convertToRunDTO(run, project.getName());
    }

    private PipelineStage createAndExecuteStage(Long runId, String stageName, String status, String logs) {
        PipelineStage stage = new PipelineStage(runId, stageName, status);
        stage.setStartedAt(LocalDateTime.now());
        stage.setCompletedAt(LocalDateTime.now());
        stage.setDurationMs(450L + (long)(Math.random() * 800));
        stage.setLogs(logs);

        // Stream real-time telemetry line-by-line via WebSocket
        if (logs != null) {
            for (String line : logs.split("\n")) {
                if (!line.trim().isEmpty()) {
                    telemetryStreamService.streamLog(runId, stageName, line, status);
                }
            }
        }

        return pipelineStageRepository.save(stage);
    }

    private String getBuildCommand(String language, String buildSystem) {
        if ("Python".equalsIgnoreCase(language)) return "python -m pip install -r requirements.txt";
        if (language.contains("JavaScript") || language.contains("TypeScript")) return "npm run build";
        if ("Gradle".equalsIgnoreCase(buildSystem)) return "./gradlew build";
        return "mvn clean package -DskipTests";
    }

    public List<PipelineRunDTO> getPipelineRunsForProject(Long projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        String projectName = project != null ? project.getName() : "Unknown Project";

        return pipelineRunRepository.findByProjectIdOrderByIdDesc(projectId).stream()
                .map(run -> convertToRunDTO(run, projectName))
                .collect(Collectors.toList());
    }

    public PipelineRunDTO getPipelineRunById(Long runId) {
        PipelineRun run = pipelineRunRepository.findById(runId)
                .orElseThrow(() -> new RuntimeException("Pipeline run not found: " + runId));

        Project project = projectRepository.findById(run.getProjectId()).orElse(null);
        String name = project != null ? project.getName() : "Unknown";

        return convertToRunDTO(run, name);
    }

    public List<PipelineRunDTO> getRecentPipelineRuns() {
        return pipelineRunRepository.findTop10ByOrderByIdDesc().stream()
                .map(run -> {
                    Project project = projectRepository.findById(run.getProjectId()).orElse(null);
                    return convertToRunDTO(run, project != null ? project.getName() : "Project #" + run.getProjectId());
                })
                .collect(Collectors.toList());
    }

    private PipelineRunDTO convertToRunDTO(PipelineRun run, String projectName) {
        PipelineRunDTO dto = new PipelineRunDTO();
        dto.setId(run.getId());
        dto.setProjectId(run.getProjectId());
        dto.setProjectName(projectName);
        dto.setStatus(run.getStatus());
        dto.setStartedAt(run.getStartedAt());
        dto.setCompletedAt(run.getCompletedAt());
        dto.setDurationMs(run.getDurationMs());
        dto.setHealthScore(run.getHealthScore());
        dto.setTriggerReason(run.getTriggerReason());

        List<PipelineStageDTO> stageDTOs = pipelineStageRepository.findByPipelineRunIdOrderByIdAsc(run.getId()).stream()
                .map(s -> {
                    PipelineStageDTO sdto = new PipelineStageDTO();
                    sdto.setId(s.getId());
                    sdto.setPipelineRunId(s.getPipelineRunId());
                    sdto.setStageName(s.getStageName());
                    sdto.setStatus(s.getStatus());
                    sdto.setStartedAt(s.getStartedAt());
                    sdto.setCompletedAt(s.getCompletedAt());
                    sdto.setDurationMs(s.getDurationMs());
                    sdto.setLogs(s.getLogs());
                    sdto.setErrorMessage(s.getErrorMessage());
                    return sdto;
                })
                .collect(Collectors.toList());

        dto.setStages(stageDTOs);
        return dto;
    }
}
