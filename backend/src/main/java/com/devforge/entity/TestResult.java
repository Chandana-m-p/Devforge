package com.devforge.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "test_results")
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long pipelineRunId;

    @Column(nullable = false)
    private Long projectId;

    private Integer total = 0;
    private Integer passed = 0;
    private Integer failed = 0;
    private Integer skipped = 0;
    private Long durationMs = 0L;

    @Column(columnDefinition = "TEXT")
    private String testDetailsJson;

    public TestResult() {}

    public TestResult(Long pipelineRunId, Long projectId, Integer total, Integer passed, Integer failed, Integer skipped, Long durationMs) {
        this.pipelineRunId = pipelineRunId;
        this.projectId = projectId;
        this.total = total;
        this.passed = passed;
        this.failed = failed;
        this.skipped = skipped;
        this.durationMs = durationMs;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPipelineRunId() { return pipelineRunId; }
    public void setPipelineRunId(Long pipelineRunId) { this.pipelineRunId = pipelineRunId; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }

    public Integer getPassed() { return passed; }
    public void setPassed(Integer passed) { this.passed = passed; }

    public Integer getFailed() { return failed; }
    public void setFailed(Integer failed) { this.failed = failed; }

    public Integer getSkipped() { return skipped; }
    public void setSkipped(Integer skipped) { this.skipped = skipped; }

    public Long getDurationMs() { return durationMs; }
    public void setDurationMs(Long durationMs) { this.durationMs = durationMs; }

    public String getTestDetailsJson() { return testDetailsJson; }
    public void setTestDetailsJson(String testDetailsJson) { this.testDetailsJson = testDetailsJson; }
}
