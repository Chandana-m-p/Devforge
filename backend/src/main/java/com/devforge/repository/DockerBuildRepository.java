package com.devforge.repository;

import com.devforge.entity.DockerBuild;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DockerBuildRepository extends JpaRepository<DockerBuild, Long> {
    Optional<DockerBuild> findTopByProjectIdOrderByIdDesc(Long projectId);
    Optional<DockerBuild> findByPipelineRunId(Long pipelineRunId);
}
