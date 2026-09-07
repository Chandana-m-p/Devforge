package com.devforge.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PipelineDTOs {

    public static class PipelineRunDTO {
        private Long id;
        private Long projectId;
        private String projectName;
        private String status;
        private LocalDateTime startedAt;
        private LocalDateTime completedAt;
        private Long durationMs;
        private Integer healthScore;
        private String triggerReason;
        private List<PipelineStageDTO> stages;

        public PipelineRunDTO() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public Long getProjectId() { return projectId; }
        public void setProjectId(Long projectId) { this.projectId = projectId; }

        public String getProjectName() { return projectName; }
        public void setProjectName(String projectName) { this.projectName = projectName; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public LocalDateTime getStartedAt() { return startedAt; }
        public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

        public LocalDateTime getCompletedAt() { return completedAt; }
        public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

        public Long getDurationMs() { return durationMs; }
        public void setDurationMs(Long durationMs) { this.durationMs = durationMs; }

        public Integer getHealthScore() { return healthScore; }
        public void setHealthScore(Integer healthScore) { this.healthScore = healthScore; }

        public String getTriggerReason() { return triggerReason; }
        public void setTriggerReason(String triggerReason) { this.triggerReason = triggerReason; }

        public List<PipelineStageDTO> getStages() { return stages; }
        public void setStages(List<PipelineStageDTO> stages) { this.stages = stages; }
    }

    public static class PipelineStageDTO {
        private Long id;
        private Long pipelineRunId;
        private String stageName;
        private String status;
        private LocalDateTime startedAt;
        private LocalDateTime completedAt;
        private Long durationMs;
        private String logs;
        private String errorMessage;

        public PipelineStageDTO() {}

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
}
