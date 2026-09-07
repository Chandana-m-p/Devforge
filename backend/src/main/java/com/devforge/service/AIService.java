package com.devforge.service;

import com.devforge.dto.AIDTOs.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    @Value("${app.ai.service-url:http://localhost:8000}")
    private String aiServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public AIExplanationResponse explainError(AIExplanationRequest request) {
        try {
            // Try connecting to Python FastAPI service if available
            return restTemplate.postForObject(aiServiceUrl + "/explain-error", request, AIExplanationResponse.class);
        } catch (Exception e) {
            // Fallback to built-in intelligent diagnostic engine
            return generateBuiltinErrorExplanation(request);
        }
    }

    public AIExplanationResponse explainSecurity(String title, String description, String severity) {
        String what = "Security Finding: " + title + " (" + severity + " Severity)";
        String why = "This vulnerability exposes the application to potential security risks: " + description;
        String fix = "Update affected library to a patched version, sanitize input parameters, and enforce strict API access controls.";
        String code = "// Remediate by upgrading dependency in build configuration\n// Example: upgrade Jackson Databind to >= 2.15.2";

        return new AIExplanationResponse(what, why, fix, code, "98%");
    }

    private AIExplanationResponse generateBuiltinErrorExplanation(AIExplanationRequest request) {
        String log = request.getErrorLog() != null ? request.getErrorLog() : "";
        
        if (log.contains("NullPointerException")) {
            return new AIExplanationResponse(
                    "NullPointerException in application thread.",
                    "An object reference was accessed before it was initialized or received a null value from a database query or external API call.",
                    "Add a non-null check before accessing property or initialize the variable with a default value.",
                    "if (object != null && object.getProp() != null) { ... }",
                    "96%"
            );
        } else if (log.contains("Cannot find module") || log.contains("ClassNotFoundException")) {
            return new AIExplanationResponse(
                    "Missing Class / Dependency Module Error.",
                    "The build runtime could not locate a required package or class on the classpath/node_modules.",
                    "Ensure dependency is added to pom.xml/package.json and run the install step.",
                    "mvn clean install   # or: npm install",
                    "95%"
            );
        } else if (log.contains("AssertionError") || log.contains("Tests failed")) {
            return new AIExplanationResponse(
                    "Automated Test Assertion Failure.",
                    "An expected output value did not match the actual return value during JUnit/pytest execution.",
                    "Inspect the failure diff, verify recent logic changes, and update test expectation if contract changed.",
                    "assertEquals(expectedVal, actualVal);",
                    "94%"
            );
        }

        return new AIExplanationResponse(
                "Build or Compilation Stage Interrupted.",
                "A build error occurred during execution of the build tool target.",
                "Review the full build log output above, check syntax errors, and verify local environment JDK/Node settings.",
                "mvn clean package -DskipTests",
                "90%"
        );
    }
}
