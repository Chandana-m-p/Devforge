import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectApi } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { GitBranch, FolderGit2, Search, Cpu, CheckCircle2, ArrowRight, Loader2, Sparkles, Layers, Box, Code } from 'lucide-react';

export const AddProjectPage = () => {
  const { isDemoMode } = useAuth();
  const navigate = useNavigate();

  const [importMode, setImportMode] = useState('github'); // 'github' or 'template'
  const [repoUrl, setRepoUrl] = useState('https://github.com/devforge/demo-api-service');
  const [name, setName] = useState('DevForge Demo API');
  const [defaultBranch, setDefaultBranch] = useState('main');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const templates = [
    {
      id: "spring-boot",
      title: "Spring Boot 3.2 Microservice",
      desc: "Java 17 + Maven + Spring Security JWT + PostgreSQL JPA",
      lang: "Java",
      build: "Maven",
      repo: "https://github.com/devforge/spring-boot-starter-template",
      icon: Cpu,
      color: "border-brand-500/40 text-brand-400 bg-brand-500/10"
    },
    {
      id: "fastapi",
      title: "FastAPI Machine Learning Service",
      desc: "Python 3.10 + Uvicorn + Pydantic + pytest + Dockerfile",
      lang: "Python",
      build: "pip",
      repo: "https://github.com/devforge/fastapi-ai-template",
      icon: Sparkles,
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10"
    },
    {
      id: "react-vite",
      title: "React 18 Console Dashboard",
      desc: "TypeScript + Vite + Tailwind CSS + Lucide Icons",
      lang: "TypeScript / JavaScript",
      build: "npm",
      repo: "https://github.com/devforge/react-vite-template",
      icon: Layers,
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
    }
  ];

  const handleSelectTemplate = (t) => {
    setName(t.title);
    setRepoUrl(t.repo);
    setAnalysisResult({
      detectedLanguage: t.lang,
      detectedBuildSystem: t.build,
      framework: t.title.split(' ')[0],
      configFiles: ["pom.xml", "Dockerfile", "docker-compose.yml"],
      hasDockerfile: true,
      hasDockerCompose: true,
      testFramework: t.lang === "Java" ? "JUnit 5" : t.lang === "Python" ? "pytest" : "Vitest"
    });
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      let lang = "Java";
      let build = "Maven";
      let framework = "Spring Boot 3.2";

      if (repoUrl.includes("python")) {
        lang = "Python";
        build = "pip";
        framework = "FastAPI";
      } else if (repoUrl.includes("react") || repoUrl.includes("node")) {
        lang = "TypeScript / JavaScript";
        build = "npm";
        framework = "React / Vite";
      }

      setAnalysisResult({
        detectedLanguage: lang,
        detectedBuildSystem: build,
        framework: framework,
        configFiles: ["pom.xml", "Dockerfile", "docker-compose.yml", "src/main/resources/application.yml"],
        hasDockerfile: true,
        hasDockerCompose: true,
        testFramework: "JUnit 5"
      });
      setAnalyzing(false);
    }, 1200);
  };

  const handleImport = async () => {
    const res = await projectApi.create({
      name,
      repositoryUrl: repoUrl,
      defaultBranch,
      language: analysisResult?.detectedLanguage || "Java",
      buildSystem: analysisResult?.detectedBuildSystem || "Maven"
    }, isDemoMode);

    navigate(`/projects/${res.data.id}`);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <FolderGit2 className="w-6 h-6 text-brand-400" />
              <span>Add & Initialize Project</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Import an existing GitHub repository or generate a new project from pre-configured infrastructure templates
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-3 mb-6 font-mono text-xs">
            <button
              onClick={() => setImportMode('github')}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 font-bold transition ${
                importMode === 'github'
                  ? 'bg-brand-600/20 text-brand-400 border-brand-500 shadow-md shadow-brand-500/10'
                  : 'bg-dark-800 text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>Import GitHub Repository</span>
            </button>
            <button
              onClick={() => setImportMode('template')}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 font-bold transition ${
                importMode === 'template'
                  ? 'bg-brand-600/20 text-brand-400 border-brand-500 shadow-md shadow-brand-500/10'
                  : 'bg-dark-800 text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Generate from Starter Template</span>
            </button>
          </div>

          {/* MODE 1: GITHUB REPO IMPORT */}
          {importMode === 'github' && (
            <div className="p-8 rounded-2xl glass-panel border border-gray-800 space-y-6">
              <form onSubmit={handleAnalyze} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 font-mono">
                    Project / Repository Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-brand-500 font-mono"
                    placeholder="my-awesome-service"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 font-mono">
                      GitHub Repository URL
                    </label>
                    <div className="relative">
                      <GitBranch className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-gray-200 focus:outline-none focus:border-brand-500 font-mono"
                        placeholder="https://github.com/org/repo"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 font-mono">
                      Default Branch
                    </label>
                    <input
                      type="text"
                      value={defaultBranch}
                      onChange={(e) => setDefaultBranch(e.target.value)}
                      className="w-full bg-dark-900 border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-brand-500 font-mono"
                      placeholder="main"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={analyzing}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition disabled:opacity-50"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing Repository Architecture...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Trigger Project Auto-Detection</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* MODE 2: STARTER TEMPLATES */}
          {importMode === 'template' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTemplate(t)}
                      className={`p-5 rounded-2xl bg-dark-900 border text-left flex flex-col justify-between gap-4 transition-all hover:-translate-y-1 ${t.color}`}
                    >
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-dark-800 border border-gray-800 inline-block">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-white text-sm">{t.title}</div>
                        <div className="text-xs text-gray-400 font-mono">{t.desc}</div>
                      </div>
                      <div className="text-[11px] font-bold text-emerald-400 font-mono">Select Template →</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="mt-8 p-6 rounded-2xl glass-panel border border-gray-800 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Repository Analysis & Template Verified</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-dark-900 border border-gray-800">
                  <div className="text-[10px] text-gray-500">DETECTED LANGUAGE</div>
                  <div className="font-bold text-white mt-1">{analysisResult.detectedLanguage}</div>
                </div>
                <div className="p-3 rounded-xl bg-dark-900 border border-gray-800">
                  <div className="text-[10px] text-gray-500">BUILD SYSTEM</div>
                  <div className="font-bold text-white mt-1">{analysisResult.detectedBuildSystem}</div>
                </div>
                <div className="p-3 rounded-xl bg-dark-900 border border-gray-800">
                  <div className="text-[10px] text-gray-500">FRAMEWORK</div>
                  <div className="font-bold text-white mt-1">{analysisResult.framework}</div>
                </div>
                <div className="p-3 rounded-xl bg-dark-900 border border-gray-800">
                  <div className="text-[10px] text-gray-500">TEST FRAMEWORK</div>
                  <div className="font-bold text-white mt-1">{analysisResult.testFramework}</div>
                </div>
              </div>

              <button
                onClick={handleImport}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Import Project & Trigger Orchestration Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
