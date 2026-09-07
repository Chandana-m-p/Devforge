package com.devforge.service;

import com.devforge.entity.Project;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class CICDGeneratorService {

    public Map<String, String> generateGitHubActionsWorkflow(Project project) {
        String lang = project.getLanguage();
        String build = project.getBuildSystem();
        String name = project.getName();

        String setupStep;
        String buildStep;
        String testStep;

        if (lang.contains("Python")) {
            setupStep = """
                    - name: Set up Python
                      uses: actions/setup-python@v4
                      with:
                        python-version: '3.10'
                """;
            buildStep = """
                    - name: Install dependencies
                      run: |
                        python -m pip install --upgrade pip
                        if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
                """;
            testStep = """
                    - name: Run Pytest
                      run: pytest
                """;
        } else if (lang.contains("JavaScript") || lang.contains("TypeScript")) {
            setupStep = """
                    - name: Set up Node.js
                      uses: actions/setup-node@v3
                      with:
                        node-version: '18'
                        cache: 'npm'
                """;
            buildStep = """
                    - name: Install & Build
                      run: |
                        npm ci
                        npm run build
                """;
            testStep = """
                    - name: Run Tests
                      run: npm test -- --passWithNoTests
                """;
        } else {
            setupStep = """
                    - name: Set up JDK 17
                      uses: actions/setup-java@v3
                      with:
                        java-version: '17'
                        distribution: 'temurin'
                        cache: maven
                """;
            buildStep = """
                    - name: Build with Maven
                      run: mvn clean package -DskipTests
                """;
            testStep = """
                    - name: Run Unit Tests
                      run: mvn test
                """;
        }

        String yamlContent = """
            # DevForge Automated CI/CD Workflow for %s
            name: DevForge CI/CD Pipeline

            on:
              push:
                branches: [ %s ]
              pull_request:
                branches: [ %s ]

            jobs:
              devforge-orchestration:
                runs-on: ubuntu-latest

                steps:
                - name: Checkout Source Code
                  uses: actions/checkout@v3

                %s
                %s
                %s
                - name: OWASP Security Dependency Scan
                  uses: snyk/actions/node@master
                  continue-on-error: true
                  env:
                    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

                - name: Build Docker Image
                  run: |
                    docker build -t devforge/%s:latest .

                - name: Report Telemetry to DevForge
                  run: echo "Pipeline complete for project %s!"
            """.formatted(
                name,
                project.getDefaultBranch(),
                project.getDefaultBranch(),
                setupStep.trim(),
                buildStep.trim(),
                testStep.trim(),
                name.toLowerCase().replaceAll("[^a-z0-9]", "-"),
                name
        );

        Map<String, String> response = new LinkedHashMap<>();
        response.put("filename", ".github/workflows/devforge-ci.yml");
        response.put("workflowYaml", yamlContent);

        return response;
    }
}
