package com.devforge.service;

import com.devforge.entity.SecurityFinding;
import com.devforge.repository.SecurityFindingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SecurityScannerService {

    @Autowired
    private SecurityFindingRepository securityFindingRepository;

    public List<SecurityFinding> scanProject(Long projectId, Long pipelineRunId, String language, String buildSystem) {
        List<SecurityFinding> findings = new ArrayList<>();

        if ("Java".equalsIgnoreCase(language)) {
            findings.add(new SecurityFinding(
                    projectId, pipelineRunId, "MEDIUM",
                    "Outdated Jackson Databind Dependency",
                    "pom.xml",
                    "CVE-2023-35116: Jackson Databind 2.14.x contains potential denial of service via cyclic data structures.",
                    "Upgrade com.fasterxml.jackson.core:jackson-databind to 2.15.2 or newer."
            ));
            findings.add(new SecurityFinding(
                    projectId, pipelineRunId, "LOW",
                    "Spring Boot Actuator Endpoints Exposed",
                    "src/main/resources/application.yml",
                    "Sensitive health & heap dump endpoints are mapped without explicit security constraints.",
                    "Set management.endpoints.web.exposure.include=health,info in application.yml."
            ));
        } else if (language.contains("JavaScript") || language.contains("TypeScript")) {
            findings.add(new SecurityFinding(
                    projectId, pipelineRunId, "HIGH",
                    "Prototype Pollution Vulnerability in Axios",
                    "package.json",
                    "CVE-2023-45857: Axios < 1.6.0 allows prototype pollution in merge functions.",
                    "Upgrade axios package to ^1.6.0 in package.json and run npm update."
            ));
        } else {
            findings.add(new SecurityFinding(
                    projectId, pipelineRunId, "LOW",
                    "Insecure HTTP Client Timeout",
                    "main.py",
                    "Requests module invoked without explicit timeout parameter, risking thread hanging.",
                    "Add timeout=10 to all requests.get() and requests.post() invocations."
            ));
        }

        return securityFindingRepository.saveAll(findings);
    }
}
