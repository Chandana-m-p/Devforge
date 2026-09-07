import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { LogViewer } from '../components/LogViewer';
import { Terminal } from 'lucide-react';

export const LogsPage = () => {
  const sampleLogs = `[ANALYZE] Initializing repository structure scan...
[ANALYZE] Detected language: Java 17
[ANALYZE] Detected build system: Apache Maven 3.9
[ANALYZE] Detected framework: Spring Boot 3.2.3

[BUILD] Executing command: mvn clean package -DskipTests
[BUILD] Compiling 41 source files with javac...
[BUILD] Packaging target/devforge-backend-1.0.0.jar
[BUILD] BUILD SUCCESSFUL (Exit Code 0)

[TEST] Executing JUnit 5 Test Runner...
[TEST] Running TestSuite: com.devforge.service.PipelineServiceTest
[TEST] 47 Tests Found, 47 Passed, 0 Failed, 0 Skipped.

[DEPENDENCY_SCAN] Scanned 18 direct project dependencies.
[DEPENDENCY_SCAN] Identified 2 outdated packages: spring-boot-starter-web (3.2.0 -> 3.2.3), jackson-databind (2.14.2 -> 2.15.2).

[SECURITY_SCAN] Running OWASP Dependency-Check rule engine...
[SECURITY_SCAN] Findings: 0 Critical, 0 High, 1 Medium (CVE-2023-35116), 1 Low.

[DOCKER_BUILD] Multi-stage build completed.
[DOCKER_BUILD] Tag assigned: devforge/demo-api-service:latest
[DOCKER_BUILD] Docker compose manifest validated clean.`;

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <Terminal className="w-6 h-6 text-brand-400" />
              <span>Centralized Log Console</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Unified build, test, security, and container logs in one single interface</p>
          </div>

          <LogViewer logs={sampleLogs} title="Unified Infrastructure Logs" />
        </main>
      </div>
    </div>
  );
};
