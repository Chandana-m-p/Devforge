package com.devforge.service;

import com.devforge.entity.Project;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnalyzerService {

    public Map<String, Object> analyzeRepository(Project project) {
        String repoUrl = project.getRepositoryUrl().toLowerCase();
        String name = project.getName().toLowerCase();

        String detectedLanguage = "Java";
        String detectedBuild = "Maven";
        String framework = "Spring Boot";
        List<String> configFiles = new ArrayList<>();
        List<String> dependencies = new ArrayList<>();

        if (repoUrl.contains("python") || name.contains("python") || name.contains("flask") || name.contains("fastapi")) {
            detectedLanguage = "Python";
            detectedBuild = "pip";
            framework = "FastAPI / Flask";
            configFiles.addAll(Arrays.asList("requirements.txt", "pyproject.toml", "Dockerfile"));
            dependencies.addAll(Arrays.asList("fastapi==0.104.1", "uvicorn==0.24.0", "pydantic==2.5.2", "pytest==7.4.3", "requests==2.31.0"));
        } else if (repoUrl.contains("node") || repoUrl.contains("react") || name.contains("js") || name.contains("ui") || name.contains("frontend")) {
            detectedLanguage = "TypeScript / JavaScript";
            detectedBuild = "npm";
            framework = "React / Vite";
            configFiles.addAll(Arrays.asList("package.json", "vite.config.js", "tailwind.config.js", "Dockerfile"));
            dependencies.addAll(Arrays.asList("react@18.2.0", "react-router-dom@6.20.0", "tailwindcss@3.3.5", "lucide-react@0.294.0", "vitest@1.0.0"));
        } else {
            detectedLanguage = "Java";
            if (repoUrl.contains("gradle") || name.contains("gradle")) {
                detectedBuild = "Gradle";
                configFiles.add("build.gradle");
            } else {
                detectedBuild = "Maven";
                configFiles.add("pom.xml");
            }
            framework = "Spring Boot 3.x";
            configFiles.addAll(Arrays.asList("Dockerfile", "docker-compose.yml", "src/main/resources/application.yml"));
            dependencies.addAll(Arrays.asList("spring-boot-starter-web", "spring-boot-starter-security", "spring-boot-starter-data-jpa", "postgresql", "junit-jupiter-api"));
        }

        project.setLanguage(detectedLanguage);
        project.setBuildSystem(detectedBuild);
        project.setFramework(framework);

        Map<String, Object> analysis = new LinkedHashMap<>();
        analysis.put("projectId", project.getId());
        analysis.put("projectName", project.getName());
        analysis.put("detectedLanguage", detectedLanguage);
        analysis.put("detectedBuildSystem", detectedBuild);
        analysis.put("framework", framework);
        analysis.put("configFiles", configFiles);
        analysis.put("dependencies", dependencies);
        analysis.put("hasDockerfile", project.getHasDockerfile());
        analysis.put("hasDockerCompose", project.getHasDockerCompose());
        analysis.put("testFramework", getTestFramework(detectedLanguage));
        analysis.put("analysisStatus", "COMPLETED");

        return analysis;
    }

    private String getTestFramework(String language) {
        if (language.contains("Python")) return "pytest";
        if (language.contains("JavaScript") || language.contains("TypeScript")) return "Vitest / Jest";
        return "JUnit 5";
    }
}
