package com.devforge.service;

import com.devforge.dto.ProjectDTOs.*;
import com.devforge.entity.Project;
import com.devforge.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private AnalyzerService analyzerService;

    @Autowired
    private PipelineService pipelineService;

    public ProjectDTO createProject(CreateProjectRequest request, Long userId) {
        Project project = new Project(
                userId != null ? userId : 1L,
                request.getName(),
                request.getRepositoryUrl(),
                request.getLanguage() != null ? request.getLanguage() : "Java",
                request.getBuildSystem() != null ? request.getBuildSystem() : "Maven",
                request.getDefaultBranch() != null ? request.getDefaultBranch() : "main"
        );

        // Run auto detection
        analyzerService.analyzeRepository(project);

        Project saved = projectRepository.save(project);

        // Trigger initial pipeline run
        pipelineService.executePipeline(saved.getId(), "Initial Repository Integration");

        return convertToDTO(projectRepository.findById(saved.getId()).get());
    }

    public List<ProjectDTO> getProjectsForUser(Long userId) {
        return projectRepository.findByUserId(userId != null ? userId : 1L).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        return convertToDTO(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    private ProjectDTO convertToDTO(Project p) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(p.getId());
        dto.setUserId(p.getUserId());
        dto.setName(p.getName());
        dto.setRepositoryUrl(p.getRepositoryUrl());
        dto.setLanguage(p.getLanguage());
        dto.setBuildSystem(p.getBuildSystem());
        dto.setDefaultBranch(p.getDefaultBranch());
        dto.setFramework(p.getFramework());
        dto.setHealthScore(p.getHealthScore());
        dto.setLastPipelineStatus(p.getLastPipelineStatus());
        dto.setHasDockerfile(p.getHasDockerfile());
        dto.setHasDockerCompose(p.getHasDockerCompose());
        dto.setCreatedAt(p.getCreatedAt());
        return dto;
    }
}
