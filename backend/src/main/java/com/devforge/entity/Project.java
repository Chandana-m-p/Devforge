package com.devforge.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String repositoryUrl;

    private String language = "Java";
    private String buildSystem = "Maven";
    private String defaultBranch = "main";
    private String framework = "Spring Boot";
    
    private Integer healthScore = 85;
    private String lastPipelineStatus = "SUCCESS";

    private Boolean hasDockerfile = false;
    private Boolean hasDockerCompose = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Project() {}

    public Project(Long userId, String name, String repositoryUrl, String language, String buildSystem, String defaultBranch) {
        this.userId = userId;
        this.name = name;
        this.repositoryUrl = repositoryUrl;
        this.language = language;
        this.buildSystem = buildSystem;
        this.defaultBranch = defaultBranch;
    }

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
