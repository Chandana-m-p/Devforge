package com.devforge.repository;

import com.devforge.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    Optional<TestResult> findByPipelineRunId(Long pipelineRunId);
    Optional<TestResult> findTopByProjectIdOrderByIdDesc(Long projectId);
}
