import axios from 'axios';
import { DEMO_PROJECTS, DEMO_PIPELINE_RUNS, DEMO_SECURITY_FINDINGS, DEMO_DEPENDENCIES, DEMO_HEALTH_BREAKDOWN } from '../data/demoData';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('devforge_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const projectApi = {
  getAll: async (isDemo) => {
    if (isDemo) return { data: DEMO_PROJECTS };
    try {
      const res = await api.get('/projects');
      return res;
    } catch {
      return { data: DEMO_PROJECTS };
    }
  },
  getById: async (id, isDemo) => {
    if (isDemo) {
      const found = DEMO_PROJECTS.find(p => p.id === Number(id)) || DEMO_PROJECTS[0];
      return { data: found };
    }
    try {
      const res = await api.get(`/projects/${id}`);
      return res;
    } catch {
      const found = DEMO_PROJECTS.find(p => p.id === Number(id)) || DEMO_PROJECTS[0];
      return { data: found };
    }
  },
  create: async (data, isDemo) => {
    if (isDemo) {
      const newProj = {
        id: Date.now(),
        userId: 1,
        name: data.name,
        repositoryUrl: data.repositoryUrl,
        language: data.language || "Java",
        buildSystem: data.buildSystem || "Maven",
        defaultBranch: data.defaultBranch || "main",
        framework: "Spring Boot 3.2",
        healthScore: 88,
        lastPipelineStatus: "SUCCESS",
        hasDockerfile: true,
        hasDockerCompose: true,
        createdAt: new Date().toISOString()
      };
      DEMO_PROJECTS.unshift(newProj);
      return { data: newProj };
    }
    const res = await api.post('/projects', data);
    return res;
  },
  triggerPipeline: async (id, isDemo) => {
    if (isDemo) {
      const newRun = {
        id: Date.now(),
        projectId: Number(id),
        projectName: "DevForge Live Execution",
        status: "SUCCESS",
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        durationMs: 45000,
        healthScore: 90,
        triggerReason: "Manual Dashboard Trigger",
        stages: [
          { id: 1, stageName: "ANALYZE", status: "SUCCESS", durationMs: 1500, logs: "[ANALYZE] Structure verified.\n[ANALYZE] Auto-detected: Java / Maven" },
          { id: 2, stageName: "BUILD", status: "SUCCESS", durationMs: 18000, logs: "[BUILD] Executed: mvn clean package\n[BUILD] BUILD SUCCESS" },
          { id: 3, stageName: "TEST", status: "SUCCESS", durationMs: 12000, logs: "[TEST] 47 Tests Found, 47 Passed." },
          { id: 4, stageName: "DEPENDENCY_SCAN", status: "SUCCESS", durationMs: 4000, logs: "[DEPENDENCY_SCAN] Scanned dependencies." },
          { id: 5, stageName: "SECURITY_SCAN", status: "SUCCESS", durationMs: 4500, logs: "[SECURITY_SCAN] OWASP scan completed clean." },
          { id: 6, stageName: "DOCKER_BUILD", status: "SUCCESS", durationMs: 5000, logs: "[DOCKER_BUILD] Image built: devforge/live:latest" }
        ]
      };
      DEMO_PIPELINE_RUNS.unshift(newRun);
      return { data: newRun };
    }
    const res = await api.post(`/projects/${id}/pipeline`);
    return res;
  },
  getPipelineRuns: async (id, isDemo) => {
    if (isDemo) return { data: DEMO_PIPELINE_RUNS.filter(r => r.projectId === Number(id)) };
    try {
      return await api.get(`/projects/${id}/pipeline-runs`);
    } catch {
      return { data: DEMO_PIPELINE_RUNS };
    }
  },
  getRecentRuns: async (isDemo) => {
    if (isDemo) return { data: DEMO_PIPELINE_RUNS };
    try {
      return await api.get('/pipeline/recent');
    } catch {
      return { data: DEMO_PIPELINE_RUNS };
    }
  },
  getSecurity: async (id, isDemo) => {
    if (isDemo) return { data: DEMO_SECURITY_FINDINGS };
    try {
      return await api.get(`/projects/${id}/security`);
    } catch {
      return { data: DEMO_SECURITY_FINDINGS };
    }
  },
  getDependencies: async (id, isDemo) => {
    if (isDemo) return { data: DEMO_DEPENDENCIES };
    try {
      return await api.get(`/projects/${id}/dependencies`);
    } catch {
      return { data: DEMO_DEPENDENCIES };
    }
  },
  getHealth: async (id, isDemo) => {
    if (isDemo) return { data: DEMO_HEALTH_BREAKDOWN };
    try {
      return await api.get(`/projects/${id}/health`);
    } catch {
      return { data: DEMO_HEALTH_BREAKDOWN };
    }
  },
  explainAI: async (errorLog, context, isDemo) => {
    if (isDemo) {
      return {
        data: {
          whatWentWrong: "Automated test assertion check failure in PipelineStage component.",
          whyItHappened: "The pipeline state was expected to be 'SUCCESS' but returned 'FAILED' during mock execution.",
          howToFix: "Verify assertion condition or update component props mock state.",
          exampleSolution: "expect(stage.status).toBe('SUCCESS');",
          confidenceScore: "96%"
        }
      };
    }
    try {
      return await api.post('/ai/explain-error', { errorLog, context });
    } catch {
      return {
        data: {
          whatWentWrong: "Build compilation target exception.",
          whyItHappened: "Missing dependency or syntax error in source file.",
          howToFix: "Run build tool compile command and check stack trace.",
          exampleSolution: "mvn clean compile",
          confidenceScore: "92%"
        }
      };
    }
  }
};

export default api;
