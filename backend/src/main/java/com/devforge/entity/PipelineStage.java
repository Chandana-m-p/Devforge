package com.devforge.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pipeline_stages")
public class PipelineStage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long pipelineRunId;

    @Column(nullable = false)
    private String stageName; // ANALYZE, BUILD, TEST, DEPENDENCY_SCAN, SECURITY_SCAN, DOCKER_BUILD

    private String status = "PENDING"; // PENDING, RUNNING, SUCCESS, FAILED, SKIPPED

    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private Long durationMs = 0L;

    @Column(columnDefinition = "TEXT")
    private String logs;

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    public PipelineStage() {}

    public PipelineStage(Long pipelineRunId, String stageName, String status) {
        this.pipelineRunId = pipelineRunId;
        this.stageName = stageName;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPipelineRunId() { return pipelineRunId; }
    public void setPipelineRunId(Long pipelineRunId) { this.pipelineRunId = pipelineRunId; }

    public String getStageName() { return stageName; }
    public void setStageName(String stageName) { this.stageName = stageName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public Long getDurationMs() { return durationMs; }
    public void setDurationMs(Long durationMs) { this.durationMs = durationMs; }

    public String getLogs() { return logs; }
    public void setLogs(String logs) { this.logs = logs; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
}
