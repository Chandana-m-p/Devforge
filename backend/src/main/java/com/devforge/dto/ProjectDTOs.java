package com.devforge.dto;

import java.time.LocalDateTime;

public class ProjectDTOs {

    public static class CreateProjectRequest {
        private String name;
        private String repositoryUrl;
        private String defaultBranch = "main";
        private String language;
        private String buildSystem;

        public CreateProjectRequest() {}

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getRepositoryUrl() { return repositoryUrl; }
        public void setRepositoryUrl(String repositoryUrl) { this.repositoryUrl = repositoryUrl; }

        public String getDefaultBranch() { return defaultBranch; }
        public void setDefaultBranch(String defaultBranch) { this.defaultBranch = defaultBranch; }

        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }

        public String getBuildSystem() { return buildSystem; }
        public void setBuildSystem(String buildSystem) { this.buildSystem = buildSystem; }
    }

    public static class ProjectDTO {
        private Long id;
        private Long userId;
        private String name;
        private String repositoryUrl;
        private String language;
        private String buildSystem;
        private String defaultBranch;
        private String framework;
        private Integer healthScore;
        private String lastPipelineStatus;
        private Boolean hasDockerfile;
        private Boolean hasDockerCompose;
        private LocalDateTime createdAt;

        public ProjectDTO() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getRepositoryUrl() { return repositoryUrl; }
        public void setRepositoryUrl(String repositoryUrl) { this.repositoryUrl = repositoryUrl; }

        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }

        public String getBuildSystem() { return buildSystem; }
        public void setBuildSystem(String buildSystem) { this.buildSystem = buildSystem; }

        public String getDefaultBranch() { return defaultBranch; }
        public void setDefaultBranch(String defaultBranch) { this.defaultBranch = defaultBranch; }

        public String getFramework() { return framework; }
        public void setFramework(String framework) { this.framework = framework; }

        public Integer getHealthScore() { return healthScore; }
        public void setHealthScore(Integer healthScore) { this.healthScore = healthScore; }

        public String getLastPipelineStatus() { return lastPipelineStatus; }
        public void setLastPipelineStatus(String lastPipelineStatus) { this.lastPipelineStatus = lastPipelineStatus; }

        public Boolean getHasDockerfile() { return hasDockerfile; }
        public void setHasDockerfile(Boolean hasDockerfile) { this.hasDockerfile = hasDockerfile; }

        public Boolean getHasDockerCompose() { return hasDockerCompose; }
        public void setHasDockerCompose(Boolean hasDockerCompose) { this.hasDockerCompose = hasDockerCompose; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
