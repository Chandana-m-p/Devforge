package com.devforge.controller;

import com.devforge.entity.DependencyInfo;
import com.devforge.entity.SecurityFinding;
import com.devforge.repository.DependencyInfoRepository;
import com.devforge.repository.SecurityFindingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects/{id}")
@CrossOrigin(origins = "*")
public class SecurityController {

    @Autowired
    private SecurityFindingRepository securityFindingRepository;

    @Autowired
    private DependencyInfoRepository dependencyInfoRepository;

    @GetMapping("/security")
    public ResponseEntity<List<SecurityFinding>> getSecurityFindings(@PathVariable Long id) {
        return ResponseEntity.ok(securityFindingRepository.findByProjectId(id));
    }

    @GetMapping("/dependencies")
    public ResponseEntity<List<DependencyInfo>> getDependencies(@PathVariable Long id) {
        return ResponseEntity.ok(dependencyInfoRepository.findByProjectId(id));
    }
}
