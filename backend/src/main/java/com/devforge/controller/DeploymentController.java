package com.devforge.controller;

import com.devforge.entity.Project;
import com.devforge.repository.ProjectRepository;
import com.devforge.service.AWSDeploymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DeploymentController {

    @Autowired
    private AWSDeploymentService awsDeploymentService;

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/projects/{id}/deploy/aws")
    public ResponseEntity<Map<String, Object>> deployToAWS(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "us-east-1") String region) {
        return ResponseEntity.ok(awsDeploymentService.deployToAWS(id, region));
    }

    @GetMapping("/projects/{id}/deploy/terraform")
    public ResponseEntity<String> downloadTerraformConfig(@PathVariable Long id) {
        Project project = projectRepository.findById(id).orElse(null);
        String tfContent = awsDeploymentService.generateTerraformConfig(project);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"main.tf\"");

        return ResponseEntity.ok().headers(headers).body(tfContent);
    }
}
