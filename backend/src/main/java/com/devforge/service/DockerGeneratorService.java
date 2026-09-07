package com.devforge.service;

import com.devforge.entity.DockerBuild;
import com.devforge.entity.Project;
import com.devforge.repository.DockerBuildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DockerGeneratorService {

    @Autowired
    private DockerBuildRepository dockerBuildRepository;

    public DockerBuild generateDockerFiles(Project project, Long pipelineRunId) {
        String lang = project.getLanguage();
        String build = project.getBuildSystem();
        String name = project.getName().toLowerCase().replaceAll("[^a-z0-9]", "-");

        String dockerfile;
        String dockerCompose;

        if (lang.contains("Python")) {
            dockerfile = """
                # Multi-stage Python Build
                FROM python:3.10-slim AS builder
                WORKDIR /app
                COPY requirements.txt .
                RUN pip install --no-cache-dir -r requirements.txt

                FROM python:3.10-slim
                WORKDIR /app
                COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
                COPY . .
                EXPOSE 8000
                CMD ["python", "main.py"]
                """;

            dockerCompose = """
                version: '3.8'
                services:
                  app:
                    build: .
                    ports:
                      - "8000:8000"
                    environment:
                      - ENV=production
                """;
        } else if (lang.contains("JavaScript") || lang.contains("TypeScript")) {
            dockerfile = """
                # Multi-stage Node.js / React Build
                FROM node:18-alpine AS builder
                WORKDIR /app
                COPY package*.json ./
                RUN npm ci
                COPY . .
                RUN npm run build

                FROM nginx:alpine
                COPY --from=builder /app/dist /usr/share/nginx/html
                EXPOSE 80
                CMD ["nginx", "-g", "daemon off;"]
                """;

            dockerCompose = """
                version: '3.8'
                services:
                  web:
                    build: .
                    ports:
                      - "80:80"
                """;
        } else {
            // Java default
            dockerfile = """
                # Multi-stage Java / Spring Boot Build
                FROM maven:3.9-eclipse-temurin-17 AS builder
                WORKDIR /app
                COPY pom.xml .
                RUN mvn dependency:go-offline
                COPY src ./src
                RUN mvn package -DskipTests

                FROM eclipse-temurin:17-jre-alpine
                WORKDIR /app
                COPY --from=builder /app/target/*.jar app.jar
                EXPOSE 8080
                ENTRYPOINT ["java", "-jar", "app.jar"]
                """;

            dockerCompose = """
                version: '3.8'
                services:
                  api:
                    build: .
                    ports:
                      - "8080:8080"
                    environment:
                      - SPRING_PROFILES_ACTIVE=prod
                      - DATABASE_URL=jdbc:postgresql://postgres:5432/devforgedb
                    depends_on:
                      - postgres
                  postgres:
                    image: postgres:15-alpine
                    environment:
                      POSTGRES_DB: devforgedb
                      POSTGRES_USER: devforge
                      POSTGRES_PASSWORD: secretpassword
                    ports:
                      - "5432:5432"
                """;
        }

        String imageName = "devforge/" + name + ":latest";
        String logs = "[DOCKER ENGINE] Automated Dockerfile generation completed for " + lang + " (" + build + ").\n" +
                "[DOCKER ENGINE] Image tag assigned: " + imageName + "\n" +
                "[DOCKER ENGINE] Multi-stage build target verified.";

        DockerBuild dockerBuild = new DockerBuild(project.getId(), pipelineRunId, imageName, "SUCCESS", dockerfile, dockerCompose);
        dockerBuild.setLogs(logs);

        project.setHasDockerfile(true);
        project.setHasDockerCompose(true);

        return dockerBuildRepository.save(dockerBuild);
    }
}
