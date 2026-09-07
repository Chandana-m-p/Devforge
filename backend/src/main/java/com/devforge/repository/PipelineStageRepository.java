package com.devforge.repository;

import com.devforge.entity.PipelineStage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PipelineStageRepository extends JpaRepository<PipelineStage, Long> {
    List<PipelineStage> findByPipelineRunIdOrderByIdAsc(Long pipelineRunId);
}
