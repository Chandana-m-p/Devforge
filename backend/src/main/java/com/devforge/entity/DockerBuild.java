package com.devforge.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "docker_builds")
public class DockerBuild {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long projectId;

    private Long pipelineRunId;

    private String imageName;
    private String status = "SUCCESS"; // SUCCESS, FAILED, PENDING
    
    @Column(columnDefinition = "TEXT")
    private String dockerfileContent;

    @Column(columnDefinition = "TEXT")
    private String dockerComposeContent;

    @Column(columnDefinition = "TEXT")
    private String logs;

    private LocalDateTime createdAt = LocalDateTime.now();

    public DockerBuild() {}

    public DockerBuild(Long projectId, Long pipelineRunId, String imageName, String status, String dockerfileContent, String dockerComposeContent) {
        this.projectId = projectId;
        this.pipelineRunId = pipelineRunId;
        this.imageName = imageName;
        this.status = status;
        this.dockerfileContent = dockerfileContent;
        this.dockerComposeContent = dockerComposeContent;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public Long getPipelineRunId() { return pipelineRunId; }
    public void setPipelineRunId(Long pipelineRunId) { this.pipelineRunId = pipelineRunId; }

    public String getImageName() { return imageName; }
    public void setImageName(String imageName) { this.imageName = imageName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDockerfileContent() { return dockerfileContent; }
    public void setDockerfileContent(String dockerfileContent) { this.dockerfileContent = dockerfileContent; }

    public String getDockerComposeContent() { return dockerComposeContent; }
    public void setDockerComposeContent(String dockerComposeContent) { this.dockerComposeContent = dockerComposeContent; }

    public String getLogs() { return logs; }
    public void setLogs(String logs) { this.logs = logs; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
