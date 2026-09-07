package com.devforge.controller;

import com.devforge.entity.DockerBuild;
import com.devforge.entity.Project;
import com.devforge.repository.DockerBuildRepository;
import com.devforge.repository.ProjectRepository;
import com.devforge.service.CICDGeneratorService;
import com.devforge.service.DockerGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/projects/{id}")
@CrossOrigin(origins = "*")
public class DockerController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private DockerGeneratorService dockerGeneratorService;

    @Autowired
    private DockerBuildRepository dockerBuildRepository;

    @Autowired
    private CICDGeneratorService cicdGeneratorService;

    @GetMapping("/docker")
    public ResponseEntity<DockerBuild> getDockerConfig(@PathVariable Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));

        DockerBuild build = dockerBuildRepository.findTopByProjectIdOrderByIdDesc(id)
                .orElseGet(() -> dockerGeneratorService.generateDockerFiles(project, null));

        return ResponseEntity.ok(build);
    }

    @PostMapping("/docker/generate")
    public ResponseEntity<DockerBuild> generateDocker(@PathVariable Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));

        return ResponseEntity.ok(dockerGeneratorService.generateDockerFiles(project, null));
    }

    @PostMapping("/ci/generate")
    public ResponseEntity<Map<String, String>> generateCIWorkflow(@PathVariable Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));

        return ResponseEntity.ok(cicdGeneratorService.generateGitHubActionsWorkflow(project));
    }
}
