import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectApi } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { StatusBadge, MetricCard } from '../components/MetricCard';
import { LogViewer, HealthScoreMeter } from '../components/LogViewer';
import { 
  FolderGit2, 
  Search, 
  Workflow, 
  Wrench, 
  CheckSquare, 
  Layers, 
  ShieldAlert, 
  Box, 
  GitBranch, 
  Terminal, 
  Activity, 
  Sparkles, 
  Play, 
  ExternalLink,
  Code,
  Copy,
  Check,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { isDemoMode } = useAuth();

  const [project, setProject] = useState(null);
  const [pipelineRun, setPipelineRun] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [runningPipeline, setRunningPipeline] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const loadProjectDetails = async () => {
      const projRes = await projectApi.getById(id, isDemoMode);
      setProject(projRes.data);

      const runRes = await projectApi.getPipelineRuns(id, isDemoMode);
      if (runRes.data && runRes.data.length > 0) {
        setPipelineRun(runRes.data[0]);
      }
    };
    loadProjectDetails();
  }, [id, isDemoMode]);

  const handleTriggerPipeline = async () => {
    setRunningPipeline(true);
    const res = await projectApi.triggerPipeline(id, isDemoMode);
    setPipelineRun(res.data);
    setRunningPipeline(false);
  };

  const handleAskAI = async (logToExplain) => {
    const res = await projectApi.explainAI(logToExplain || "Test failure in pipeline stage", "Project Details Panel", isDemoMode);
    setAiResponse(res.data);
    setActiveTab('AI Assistant');
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
        <Navbar />
        <div className="flex flex-1 items-center justify-center text-gray-400 font-mono">
          Loading Infrastructure Workstation...
        </div>
      </div>
    );
  }

  const tabs = [
    { name: 'Overview', icon: FolderGit2 },
    { name: 'Analysis', icon: Search },
    { name: 'Pipeline', icon: Workflow },
    { name: 'Build', icon: Wrench },
    { name: 'Tests', icon: CheckSquare },
    { name: 'Dependencies', icon: Layers },
    { name: 'Security', icon: ShieldAlert },
    { name: 'Docker', icon: Box },
    { name: 'CI/CD', icon: GitBranch },
    { name: 'Logs', icon: Terminal },
    { name: 'Health', icon: Activity },
    { name: 'AI Assistant', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Project Header Card */}
          <div className="p-6 rounded-2xl glass-panel border border-gray-800 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-extrabold text-white">{project.name}</h1>
                <StatusBadge status={project.lastPipelineStatus} />
                <span className="text-xs px-2.5 py-1 rounded bg-gray-800 border border-gray-700 text-gray-300 font-mono font-medium">
                  {project.language} ({project.buildSystem})
                </span>
              </div>
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-400 font-mono flex items-center gap-1 hover:text-brand-400 transition"
              >
                <span>{project.repositoryUrl}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] text-gray-400 font-mono uppercase">PROJECT HEALTH</div>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                  {project.healthScore} / 100
                </div>
              </div>

              <button
                onClick={handleTriggerPipeline}
                disabled={runningPipeline}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-brand-600/30 transition disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${runningPipeline ? 'animate-spin' : ''}`} />
                <span>{runningPipeline ? 'Running Pipeline...' : 'Run Pipeline'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-gray-800 overflow-x-auto pb-px mb-8">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.name;
              return (
                <button
                  key={t.name}
                  onClick={() => setActiveTab(t.name)}
                  className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                    isActive
                      ? 'bg-dark-800 text-brand-400 border-t-2 border-brand-500 border-x border-gray-800'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-dark-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.name}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard title="Primary Language" value={project.language} icon={Code} color="brand" />
                <MetricCard title="Build System" value={project.buildSystem} icon={Wrench} color="cyan" />
                <MetricCard title="Unit Tests" value="47 Passed" subtext="0 Failed / 0 Skipped" icon={CheckSquare} color="emerald" />
                <MetricCard title="Docker Container" value={project.hasDockerfile ? "Configured" : "Generated"} icon={Box} color="indigo" />
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4">
                <div className="font-bold text-sm text-white">Repository Overview</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-dark-900 rounded-xl border border-gray-800">
                    <span className="text-gray-500">Framework: </span>
                    <span className="text-gray-200 font-bold">{project.framework || 'Spring Boot 3.2'}</span>
                  </div>
                  <div className="p-3 bg-dark-900 rounded-xl border border-gray-800">
                    <span className="text-gray-500">Default Branch: </span>
                    <span className="text-gray-200 font-bold">{project.defaultBranch || 'main'}</span>
                  </div>
                  <div className="p-3 bg-dark-900 rounded-xl border border-gray-800">
                    <span className="text-gray-500">CI/CD Engine: </span>
                    <span className="text-emerald-400 font-bold">DevForge Automated Workflow</span>
                  </div>
                  <div className="p-3 bg-dark-900 rounded-xl border border-gray-800">
                    <span className="text-gray-500">Security Rule Engine: </span>
                    <span className="text-amber-400 font-bold">OWASP Dependency-Check Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANALYSIS */}
          {activeTab === 'Analysis' && (
            <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-6">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-400" />
                <span>Automatic Project Structure Detection</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-dark-900 border border-gray-800">
                  <div className="text-[10px] text-gray-500">DETECTED LANGUAGE</div>
                  <div className="font-bold text-white text-base mt-1">{project.language}</div>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-gray-800">
                  <div className="text-[10px] text-gray-500">BUILD TOOL</div>
                  <div className="font-bold text-white text-base mt-1">{project.buildSystem}</div>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-gray-800">
                  <div className="text-[10px] text-gray-500">FRAMEWORK</div>
                  <div className="font-bold text-white text-base mt-1">{project.framework || 'Spring Boot'}</div>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-gray-800">
                  <div className="text-[10px] text-gray-500">TEST FRAMEWORK</div>
                  <div className="font-bold text-white text-base mt-1">JUnit 5 / Vitest</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-gray-300 font-mono">Detected Manifest Files:</div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {['pom.xml', 'Dockerfile', 'docker-compose.yml', 'src/main/resources/application.yml', '.github/workflows/devforge-ci.yml'].map((f) => (
                    <span key={f} className="px-3 py-1 bg-dark-900 border border-gray-700 rounded text-emerald-400">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PIPELINE */}
          {activeTab === 'Pipeline' && (
            <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-6">
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-brand-400" />
                  <span>Pipeline Execution Stage Graph</span>
                </div>
                <StatusBadge status={pipelineRun?.status || 'SUCCESS'} />
              </div>

              {/* Visual Pipeline Graph */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {(pipelineRun?.stages || [
                  { stageName: "ANALYZE", status: "SUCCESS" },
                  { stageName: "BUILD", status: "SUCCESS" },
                  { stageName: "TEST", status: "SUCCESS" },
                  { stageName: "DEPENDENCY_SCAN", status: "SUCCESS" },
                  { stageName: "SECURITY_SCAN", status: "SUCCESS" },
                  { stageName: "DOCKER_BUILD", status: "SUCCESS" },
                ]).map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-dark-900 border border-gray-800 flex flex-col items-center text-center gap-2">
                    <span className="text-[10px] font-mono text-gray-500">STAGE {idx + 1}</span>
                    <span className="font-bold text-xs text-white font-mono">{s.stageName}</span>
                    <StatusBadge status={s.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BUILD */}
          {activeTab === 'Build' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4">
                <div className="font-bold text-sm text-white">Automated Build Orchestration</div>
                <div className="p-3 bg-dark-900 rounded-xl border border-gray-800 font-mono text-xs text-emerald-400">
                  Executing: {project.buildSystem === 'Maven' ? 'mvn clean package -DskipTests' : project.buildSystem === 'npm' ? 'npm run build' : 'python -m pip install -r requirements.txt'}
                </div>
              </div>
              <LogViewer logs={pipelineRun?.stages?.find(s => s.stageName === 'BUILD')?.logs || "[BUILD] Executing build command...\n[BUILD] Compilation finished with exit code 0."} title="Build Compilation Output" />
            </div>
          )}

          {/* TAB 5: TESTS */}
          {activeTab === 'Tests' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard title="Total Tests" value="47" icon={CheckSquare} color="brand" />
                <MetricCard title="Passed" value="47" icon={CheckSquare} color="emerald" />
                <MetricCard title="Failed" value="0" icon={CheckSquare} color="rose" />
                <MetricCard title="Skipped" value="0" icon={CheckSquare} color="amber" />
              </div>
              <LogViewer logs={pipelineRun?.stages?.find(s => s.stageName === 'TEST')?.logs || "[TEST] Running JUnit 5 test suite...\n[TEST] 47 Tests Found, 47 Passed, 0 Failed, 0 Skipped."} title="Automated Test Execution Logs" />
            </div>
          )}

          {/* TAB 6: DEPENDENCIES */}
          {activeTab === 'Dependencies' && (
            <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-400" />
                <span>Project Dependencies Manifest</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { name: "spring-boot-starter-web", current: "3.2.0", latest: "3.2.3", status: "OUTDATED", rec: "Upgrade to 3.2.3" },
                  { name: "jackson-databind", current: "2.14.2", latest: "2.15.2", status: "VULNERABLE", rec: "CVE-2023-35116 patch available" },
                  { name: "postgresql", current: "42.6.0", latest: "42.6.0", status: "UP_TO_DATE", rec: "Up to date" }
                ].map((dep, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-dark-900 border border-gray-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{dep.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Current: {dep.current} ➔ Latest: {dep.latest}</div>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={dep.status} />
                      <div className="text-[10px] text-amber-400 mt-1">{dep.rec}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY */}
          {activeTab === 'Security' && (
            <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>OWASP & Custom Security Rule Engine Findings</span>
              </div>
              <div className="space-y-4 font-mono text-xs">
                {[
                  {
                    title: "Outdated Jackson Databind Dependency (CVE-2023-35116)",
                    severity: "MEDIUM",
                    file: "pom.xml",
                    desc: "Potential denial of service via cyclic JSON data structures.",
                    fix: "Upgrade com.fasterxml.jackson.core:jackson-databind to 2.15.2 in pom.xml"
                  },
                  {
                    title: "Spring Boot Actuator Endpoints Unauthenticated",
                    severity: "LOW",
                    file: "src/main/resources/application.yml",
                    desc: "Health and dump endpoints exposed without explicit authorization check.",
                    fix: "Restrict endpoints via Spring Security configuration."
                  }
                ].map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{sec.title}</span>
                      <StatusBadge status={sec.severity} />
                    </div>
                    <div className="text-[11px] text-gray-400">File: {sec.file}</div>
                    <div className="text-[11px] text-gray-300">{sec.desc}</div>
                    <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
                      💡 Recommendation: {sec.fix}
                    </div>
                    <button
                      onClick={() => handleAskAI(sec.title + " " + sec.desc)}
                      className="px-3 py-1 bg-brand-600/20 text-brand-400 border border-brand-500/30 rounded text-[11px] font-bold flex items-center gap-1.5 hover:bg-brand-600/30 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Explain Security Fix with AI</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: DOCKER */}
          {activeTab === 'Docker' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4">
                <div className="font-bold text-sm text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-cyan-400" />
                    <span>Auto-Generated Multi-Stage Dockerfile</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono">✓ Multi-Stage Ready</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
{`# DevForge Multi-Stage Docker Build Strategy
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
ENTRYPOINT ["java", "-jar", "app.jar"]`}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: CI/CD */}
          {activeTab === 'CI/CD' && (
            <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-4">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-purple-400" />
                <span>Generated GitHub Actions CI/CD Workflow (.github/workflows/devforge-ci.yml)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
{`name: DevForge CI/CD Pipeline
on:
  push:
    branches: [ main ]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    - run: mvn clean package -DskipTests
    - run: mvn test
    - name: Build Docker Image
      run: docker build -t devforge/demo-api:latest .`}
              </div>
            </div>
          )}

          {/* TAB 10: LOGS */}
          {activeTab === 'Logs' && (
            <LogViewer logs={pipelineRun?.stages?.map(s => `[${s.stageName}] ${s.logs}`).join('\n\n') || "No logs available."} title="Centralized Pipeline Console Logs" />
          )}

          {/* TAB 11: HEALTH */}
          {activeTab === 'Health' && (
            <div className="p-6 rounded-2xl glass-panel border border-gray-800 flex flex-col items-center space-y-6">
              <HealthScoreMeter score={project.healthScore} showDetails={true} />
              <div className="w-full max-w-xl space-y-3 font-mono text-xs">
                <div className="p-3 bg-dark-900 rounded-xl border border-gray-800 flex items-center justify-between">
                  <span>Build Orchestration (25%)</span>
                  <span className="text-emerald-400 font-bold">100/100</span>
                </div>
                <div className="p-3 bg-dark-900 rounded-xl border border-gray-800 flex items-center justify-between">
                  <span>Automated Testing (25%)</span>
                  <span className="text-emerald-400 font-bold">100/100</span>
                </div>
                <div className="p-3 bg-dark-900 rounded-xl border border-gray-800 flex items-center justify-between">
                  <span>OWASP Security Scan (20%)</span>
                  <span className="text-amber-400 font-bold">85/100</span>
                </div>
                <div className="p-3 bg-dark-900 rounded-xl border border-gray-800 flex items-center justify-between">
                  <span>Dependency Health (15%)</span>
                  <span className="text-amber-400 font-bold">78/100</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: AI ASSISTANT */}
          {activeTab === 'AI Assistant' && (
            <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-6">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-400" />
                <span>DevForge AI Error Explanation & Security Remediation Assistant</span>
              </div>

              {!aiResponse ? (
                <div className="p-8 text-center space-y-4">
                  <p className="text-xs text-gray-400 max-w-md mx-auto">
                    Click any build failure or security finding to analyze root cause in plain beginner-friendly language.
                  </p>
                  <button
                    onClick={() => handleAskAI("Simulated test failure assertion error")}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Sample Error Diagnostic</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-2">
                    <div className="text-[10px] text-gray-500 uppercase">WHAT WENT WRONG</div>
                    <div className="font-bold text-rose-400 text-sm">{aiResponse.whatWentWrong}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-2">
                    <div className="text-[10px] text-gray-500 uppercase">WHY IT HAPPENED</div>
                    <div className="text-gray-300">{aiResponse.whyItHappened}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-dark-900 border border-gray-800 space-y-2">
                    <div className="text-[10px] text-gray-500 uppercase">HOW TO FIX</div>
                    <div className="text-emerald-400 font-bold">{aiResponse.howToFix}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-gray-800 space-y-2">
                    <div className="text-[10px] text-gray-500 uppercase">EXAMPLE CODE SOLUTION</div>
                    <pre className="text-xs overflow-x-auto">{aiResponse.exampleSolution}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
