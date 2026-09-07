import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectApi } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { GitBranch, FolderGit2, Search, Cpu, CheckCircle2, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export const AddProjectPage = () => {
  const { isDemoMode } = useAuth();
  const navigate = useNavigate();

  const [repoUrl, setRepoUrl] = useState('https://github.com/devforge/demo-api-service');
  const [name, setName] = useState('DevForge Demo API');
  const [defaultBranch, setDefaultBranch] = useState('main');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

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
              <span>Connect GitHub Repository</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              DevForge backend service will clone metadata, detect language & build systems, and execute the automated orchestration pipeline.
            </p>
          </div>

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

            {/* Analysis Results Display */}
            {analysisResult && (
              <div className="mt-8 pt-6 border-t border-gray-800 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Repository Analysis Completed</span>
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
                  <span>Import & Start Orchestration Pipeline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
