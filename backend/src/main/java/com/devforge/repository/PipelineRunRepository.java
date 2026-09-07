package com.devforge.repository;

import com.devforge.entity.PipelineRun;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PipelineRunRepository extends JpaRepository<PipelineRun, Long> {
    List<PipelineRun> findByProjectIdOrderByIdDesc(Long projectId);
    List<PipelineRun> findTop10ByOrderByIdDesc();
}
