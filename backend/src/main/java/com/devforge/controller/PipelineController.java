package com.devforge.controller;

import com.devforge.dto.PipelineDTOs.*;
import com.devforge.service.PipelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PipelineController {

    @Autowired
    private PipelineService pipelineService;

    @PostMapping("/projects/{id}/pipeline")
    public ResponseEntity<PipelineRunDTO> triggerPipeline(@PathVariable Long id, @RequestParam(required = false) String reason) {
        return ResponseEntity.ok(pipelineService.executePipeline(id, reason));
    }

    @GetMapping("/projects/{id}/pipeline-runs")
    public ResponseEntity<List<PipelineRunDTO>> getPipelineRunsForProject(@PathVariable Long id) {
        return ResponseEntity.ok(pipelineService.getPipelineRunsForProject(id));
    }

    @GetMapping("/pipeline/recent")
    public ResponseEntity<List<PipelineRunDTO>> getRecentPipelineRuns() {
        return ResponseEntity.ok(pipelineService.getRecentPipelineRuns());
    }

    @GetMapping("/pipeline/{id}")
    public ResponseEntity<PipelineRunDTO> getPipelineRunById(@PathVariable Long id) {
        return ResponseEntity.ok(pipelineService.getPipelineRunById(id));
    }
}
