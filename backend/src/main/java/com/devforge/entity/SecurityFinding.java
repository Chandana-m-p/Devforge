package com.devforge.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "security_findings")
public class SecurityFinding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long projectId;

    private Long pipelineRunId;

    @Column(nullable = false)
    private String severity; // CRITICAL, HIGH, MEDIUM, LOW, INFO

    @Column(nullable = false)
    private String title;

    private String targetFile;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String recommendation;

    public SecurityFinding() {}

    public SecurityFinding(Long projectId, Long pipelineRunId, String severity, String title, String targetFile, String description, String recommendation) {
        this.projectId = projectId;
        this.pipelineRunId = pipelineRunId;
        this.severity = severity;
        this.title = title;
        this.targetFile = targetFile;
        this.description = description;
        this.recommendation = recommendation;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public Long getPipelineRunId() { return pipelineRunId; }
    public void setPipelineRunId(Long pipelineRunId) { this.pipelineRunId = pipelineRunId; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getTargetFile() { return targetFile; }
    public void setTargetFile(String targetFile) { this.targetFile = targetFile; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
}
