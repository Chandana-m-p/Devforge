package com.devforge.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "dependencies")
public class DependencyInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long projectId;

    @Column(nullable = false)
    private String name;

    private String currentVersion;
    private String latestVersion;
    private Integer vulnerabilityCount = 0;
    private String status = "UP_TO_DATE"; // UP_TO_DATE, OUTDATED, VULNERABLE
    private String recommendation;

    public DependencyInfo() {}

    public DependencyInfo(Long projectId, String name, String currentVersion, String latestVersion, Integer vulnerabilityCount, String status, String recommendation) {
        this.projectId = projectId;
        this.name = name;
        this.currentVersion = currentVersion;
        this.latestVersion = latestVersion;
        this.vulnerabilityCount = vulnerabilityCount;
        this.status = status;
        this.recommendation = recommendation;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCurrentVersion() { return currentVersion; }
    public void setCurrentVersion(String currentVersion) { this.currentVersion = currentVersion; }

    public String getLatestVersion() { return latestVersion; }
    public void setLatestVersion(String latestVersion) { this.latestVersion = latestVersion; }

    public Integer getVulnerabilityCount() { return vulnerabilityCount; }
    public void setVulnerabilityCount(Integer vulnerabilityCount) { this.vulnerabilityCount = vulnerabilityCount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
}
