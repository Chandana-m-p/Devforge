package com.devforge.repository;

import com.devforge.entity.DependencyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DependencyInfoRepository extends JpaRepository<DependencyInfo, Long> {
    List<DependencyInfo> findByProjectId(Long projectId);
}
