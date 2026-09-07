package com.devforge.repository;

import com.devforge.entity.SecurityFinding;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SecurityFindingRepository extends JpaRepository<SecurityFinding, Long> {
    List<SecurityFinding> findByProjectId(Long projectId);
    List<SecurityFinding> findByPipelineRunId(Long pipelineRunId);
}
