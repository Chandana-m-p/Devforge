export const DEMO_PROJECTS = [
  {
    id: 1,
    userId: 1,
    name: "DevForge Demo API",
    repositoryUrl: "https://github.com/devforge/demo-api-service",
    language: "Java",
    buildSystem: "Maven",
    defaultBranch: "main",
    framework: "Spring Boot 3.2",
    healthScore: 87,
    lastPipelineStatus: "SUCCESS",
    hasDockerfile: true,
    hasDockerCompose: true,
    createdAt: "2026-09-01T10:00:00Z"
  },
  {
    id: 2,
    userId: 1,
    name: "Cloud Microservice Gateway",
    repositoryUrl: "https://github.com/devforge/cloud-microservice",
    language: "Python",
    buildSystem: "pip",
    defaultBranch: "main",
    framework: "FastAPI / Flask",
    healthScore: 92,
    lastPipelineStatus: "SUCCESS",
    hasDockerfile: true,
    hasDockerCompose: true,
    createdAt: "2026-09-02T14:30:00Z"
  },
  {
    id: 3,
    userId: 1,
    name: "DevForge Console Frontend",
    repositoryUrl: "https://github.com/devforge/web-console",
    language: "TypeScript / JavaScript",
    buildSystem: "npm",
    defaultBranch: "main",
    framework: "React / Vite",
    healthScore: 78,
    lastPipelineStatus: "FAILED",
    hasDockerfile: true,
    hasDockerCompose: false,
    createdAt: "2026-09-05T09:15:00Z"
  }
];

export const DEMO_PIPELINE_RUNS = [
  {
    id: 101,
    projectId: 1,
    projectName: "DevForge Demo API",
    status: "SUCCESS",
    startedAt: "2026-09-07T08:30:00Z",
    completedAt: "2026-09-07T08:31:12Z",
    durationMs: 72000,
    healthScore: 87,
    triggerReason: "GitHub Push to main",
    stages: [
      { id: 1, stageName: "ANALYZE", status: "SUCCESS", durationMs: 2400, logs: "[ANALYZE] Repository structure verified.\n[ANALYZE] Language detected: Java\n[ANALYZE] Build system: Maven\n[ANALYZE] Framework: Spring Boot 3.2" },
      { id: 2, stageName: "BUILD", status: "SUCCESS", durationMs: 28000, logs: "[BUILD] Executing: mvn clean package -DskipTests\n[BUILD] Compiling 42 source files...\n[BUILD] Packaging target/demo-api-service-1.0.0.jar\n[BUILD] BUILD SUCCESS (Exit Code 0)" },
      { id: 3, stageName: "TEST", status: "SUCCESS", durationMs: 14200, logs: "[TEST] Running JUnit 5 Test Engine...\n[TEST] TestSuite: com.devforge.api.UserControllerTest\n[TEST] 47 Tests Found, 47 Passed, 0 Failed, 0 Skipped." },
      { id: 4, stageName: "DEPENDENCY_SCAN", status: "SUCCESS", durationMs: 8400, logs: "[DEPENDENCY_SCAN] Scanned 18 direct dependencies.\n[DEPENDENCY_SCAN] 16 up to date, 2 outdated packages identified." },
      { id: 5, stageName: "SECURITY_SCAN", status: "SUCCESS", durationMs: 9100, logs: "[SECURITY_SCAN] Running OWASP Dependency-Check engine...\n[SECURITY_SCAN] Findings: 0 Critical, 0 High, 1 Medium, 1 Low." },
      { id: 6, stageName: "DOCKER_BUILD", status: "SUCCESS", durationMs: 9900, logs: "[DOCKER_BUILD] Multi-stage build completed.\n[DOCKER_BUILD] Image tag: devforge/demo-api-service:latest\n[DOCKER_BUILD] Docker compose configuration validated." }
    ]
  },
  {
    id: 102,
    projectId: 3,
    projectName: "DevForge Console Frontend",
    status: "FAILED",
    startedAt: "2026-09-07T07:15:00Z",
    completedAt: "2026-09-07T07:16:05Z",
    durationMs: 65000,
    healthScore: 78,
    triggerReason: "Pull Request #14",
    stages: [
      { id: 1, stageName: "ANALYZE", status: "SUCCESS", durationMs: 1800, logs: "[ANALYZE] Language detected: TypeScript / React\n[ANALYZE] Build system: npm / Vite" },
      { id: 2, stageName: "BUILD", status: "SUCCESS", durationMs: 22000, logs: "[BUILD] Executing: npm run build\n[BUILD] vite v5.0.0 building for production...\n[BUILD] dist/assets/index-4a8b.js 142 kB" },
      { id: 3, stageName: "TEST", status: "FAILED", durationMs: 11000, logs: "[TEST] Running Vitest...\n[FAIL] src/components/PipelineStage.test.jsx\n  AssertionError: expected 'FAILED' to equal 'SUCCESS'\n  at Context.<anonymous> (src/components/PipelineStage.test.jsx:24:12)", errorMessage: "AssertionError: expected 'FAILED' to equal 'SUCCESS' in PipelineStage.test.jsx:24" },
      { id: 4, stageName: "DEPENDENCY_SCAN", status: "SKIPPED", durationMs: 0, logs: "[SKIPPED] Previous stage failed." },
      { id: 5, stageName: "SECURITY_SCAN", status: "SKIPPED", durationMs: 0, logs: "[SKIPPED] Previous stage failed." },
      { id: 6, stageName: "DOCKER_BUILD", status: "SKIPPED", durationMs: 0, logs: "[SKIPPED] Previous stage failed." }
    ]
  }
];

export const DEMO_DEPENDENCIES = [
  { id: 1, projectId: 1, name: "spring-boot-starter-web", currentVersion: "3.2.0", latestVersion: "3.2.3", vulnerabilityCount: 0, status: "OUTDATED", recommendation: "Upgrade to 3.2.3" },
  { id: 2, projectId: 1, name: "jackson-databind", currentVersion: "2.14.2", latestVersion: "2.15.2", vulnerabilityCount: 1, status: "VULNERABLE", recommendation: "Upgrade to 2.15.2 to fix CVE-2023-35116" },
  { id: 3, projectId: 1, name: "postgresql", currentVersion: "42.6.0", latestVersion: "42.6.0", vulnerabilityCount: 0, status: "UP_TO_DATE", recommendation: "Up to date" },
  { id: 4, projectId: 1, name: "jjwt-api", currentVersion: "0.11.5", latestVersion: "0.11.5", vulnerabilityCount: 0, status: "UP_TO_DATE", recommendation: "Up to date" },
  { id: 5, projectId: 1, name: "spring-security-config", currentVersion: "6.2.0", latestVersion: "6.2.2", vulnerabilityCount: 0, status: "OUTDATED", recommendation: "Upgrade to 6.2.2" }
];

export const DEMO_SECURITY_FINDINGS = [
  {
    id: 1,
    projectId: 1,
    pipelineRunId: 101,
    severity: "MEDIUM",
    title: "Outdated Jackson Databind Dependency (CVE-2023-35116)",
    targetFile: "pom.xml",
    description: "Jackson Databind version 2.14.2 contains a potential Denial of Service vulnerability when handling deeply nested cyclic JSON structures.",
    recommendation: "Update jackson-databind to version 2.15.2 or higher in pom.xml."
  },
  {
    id: 2,
    projectId: 1,
    pipelineRunId: 101,
    severity: "LOW",
    title: "Spring Boot Actuator Health Detail Exposure",
    targetFile: "src/main/resources/application.yml",
    description: "Actuator health endpoint displays full stack trace details to unauthenticated requests.",
    recommendation: "Set management.endpoint.health.show-details=when_authorized in application.yml."
  }
];

export const DEMO_HEALTH_BREAKDOWN = {
  overallScore: 87,
  buildScore: 100,
  testScore: 100,
  securityScore: 85,
  dependencyScore: 78,
  containerScore: 100,
  cicdScore: 90,
  breakdown: [
    { category: "Build Orchestration", score: 100, weight: "25%", status: "Optimal" },
    { category: "Automated Testing", score: 100, weight: "25%", status: "47/47 Passed" },
    { category: "Security Scanning", score: 85, weight: "20%", status: "1 Medium, 1 Low Issue" },
    { category: "Dependency Health", score: 78, weight: "15%", status: "2 Outdated Libraries" },
    { category: "Docker Containerization", score: 100, weight: "10%", status: "Dockerfile & Compose Ready" },
    { category: "CI/CD Automation", score: 90, weight: "5%", status: "GitHub Actions Configured" }
  ]
};
