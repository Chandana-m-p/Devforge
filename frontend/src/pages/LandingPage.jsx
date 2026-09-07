import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  GitBranch, 
  Search, 
  Wrench, 
  CheckCircle2, 
  ShieldCheck, 
  Box, 
  Rocket, 
  Sparkles, 
  Terminal, 
  Zap, 
  AlertTriangle, 
  Layers, 
  ArrowRight,
  Shield,
  Activity,
  Check,
  Star,
  Lock,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Copy
} from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const LandingPage = () => {
  const [selectedStage, setSelectedStage] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const pipelineStages = [
    { stage: "GitHub", icon: GitBranch, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30", log: "[GITHUB] Hook triggered on push to main branch.\n[GITHUB] Repository metadata imported securely via REST backend." },
    { stage: "Analyze", icon: Search, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", log: "[ANALYZE] Language detected: Java 17\n[ANALYZE] Build system: Maven (pom.xml)\n[ANALYZE] Framework: Spring Boot 3.2.3" },
    { stage: "Build", icon: Wrench, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30", log: "[BUILD] Executing: mvn clean package -DskipTests\n[BUILD] Compiling 41 source files...\n[BUILD] BUILD SUCCESSFUL (Exit code 0)" },
    { stage: "Test", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", log: "[TEST] Executing JUnit 5 Engine...\n[TEST] 47 Tests Found, 47 Passed, 0 Failed, 0 Skipped.\n[TEST] Duration: 1.84s" },
    { stage: "Security", icon: ShieldCheck, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", log: "[SECURITY] Running OWASP Dependency-Check engine...\n[SECURITY] 18 Dependencies Scanned.\n[SECURITY] Findings: 0 Critical, 0 High, 1 Medium (CVE-2023-35116)." },
    { stage: "Docker", icon: Box, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/30", log: "[DOCKER] Multi-stage JDK 17 Dockerfile generated.\n[DOCKER] Tag assigned: devforge/demo-api-service:latest\n[DOCKER] Docker Compose manifest verified." },
    { stage: "Deploy", icon: Rocket, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/30", log: "[DEPLOY] GitHub Actions workflow generated (.github/workflows/devforge-ci.yml).\n[DEPLOY] Ready for AWS EC2 / Docker host deployment!" },
  ];

  const faqs = [
    { q: "How does DevForge automate my project build without manual scripts?", a: "When you connect your GitHub repository, DevForge auto-detects manifest files (pom.xml, build.gradle, package.json, requirements.txt) and automatically executes the appropriate build, test, security, and container targets." },
    { q: "Do I need Docker installed locally to evaluate DevForge?", a: "No! DevForge includes a 1-click Demo Mode sandbox pre-seeded with realistic project telemetry, logs, test outputs, and security findings so you can evaluate the entire workflow instantly." },
    { q: "Is the AI Error Assistant optional?", a: "Yes. The AI microservice is modular and optional. The core platform features (builds, tests, security scans, health score, Docker generation) function independently without AI." },
    { q: "Which programming languages and build tools are supported?", a: "DevForge supports Java (Maven & Gradle), Python (pip, FastAPI, Flask), and JavaScript/TypeScript (npm, React, Vite) out of the box." }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans selection:bg-brand-600 selection:text-white">
      <Navbar />

      {/* Hero Section with Ambient Lighting Mesh */}
      <section className="relative overflow-hidden pt-20 pb-28 border-b border-gray-800/80 hero-glow-mesh">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          
          {/* Badge Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-500/30 text-brand-300 text-xs font-mono font-bold mb-8 shadow-lg shadow-brand-500/10">
            <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
            <span>UNIFIED DEVELOPER INFRASTRUCTURE PLATFORM</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
            DevForge <br />
            <span className="text-gradient-primary">
              Forge. Build. Ship.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            One unified orchestration layer for building, testing, securing and containerizing your software projects. Stop fighting tool fragmentation — connect your repository and ship with confidence.
          </p>

          {/* Floating Metric Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs font-mono">
            <span className="px-3.5 py-2 rounded-xl bg-dark-800/90 border border-gray-800 text-indigo-400 font-bold flex items-center gap-2 shadow-md">
              ⚡ 10x Automated Pipeline Speed
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-dark-800/90 border border-gray-800 text-cyan-400 font-bold flex items-center gap-2 shadow-md">
              🛡️ Zero Security Blindspots
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-dark-800/90 border border-gray-800 text-emerald-400 font-bold flex items-center gap-2 shadow-md">
              ✦ 0–100 Real-Time Health Score
            </span>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 bg-dark-800/90 hover:bg-dark-700 text-gray-200 border border-gray-700 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>View Interactive Demo</span>
            </Link>
          </div>

          {/* Hero Visual Showcase Frame */}
          <div className="p-2 md:p-3 rounded-2xl glass-panel-glow shadow-2xl max-w-5xl mx-auto relative overflow-hidden animate-float">
            <div className="bg-dark-900 rounded-xl overflow-hidden border border-gray-800 relative">
              <img
                src="/hero_illustration.jpg"
                alt="DevForge Infrastructure Platform Showcase"
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Pipeline Execution Stage Graph */}
      <section className="py-24 bg-dark-900 border-b border-gray-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-black text-white">
              Interactive Pipeline Simulator
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              Click any stage node below to inspect live execution telemetry and logs
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gray-800/80 shadow-2xl max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800/80 pb-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-bold text-white">devforge-orchestrator v1.0 • Live Simulation</span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                STAGE: {pipelineStages[selectedStage].stage.toUpperCase()}
              </span>
            </div>

            {/* Stage Selector Grid */}
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center">
              {pipelineStages.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = selectedStage === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedStage(idx)}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      isSelected
                        ? `${item.bg} border-brand-500 ring-2 ring-brand-500/40 -translate-y-1 shadow-lg`
                        : 'bg-dark-800/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${item.color}`} />
                    <span className="text-xs font-bold text-gray-200 font-mono">{item.stage}</span>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <Check className="w-3 h-3" /> Ready
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Log Terminal Output */}
            <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed border border-gray-800 overflow-x-auto whitespace-pre">
              <div className="text-[10px] text-gray-500 uppercase mb-2">// Telemetry Log Output — {pipelineStages[selectedStage].stage} Stage</div>
              {pipelineStages[selectedStage].log}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Feature Showcase */}
      <section className="py-24 bg-dark-800/40 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-black text-white">Engineered for Technical Excellence</h2>
            <p className="text-xs text-gray-400">Modular developer infrastructure designed for zero configuration overhead.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Tile 1: Auto Detection (Large 8 cols) */}
            <div className="md:col-span-8 p-8 rounded-2xl bg-dark-900 border border-gray-800 space-y-4 glass-card-interactive">
              <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 text-brand-400 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Automatic Project & Language Auto-Detection</h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
                DevForge automatically analyzes repository structure upon connection, detecting Java (Maven/Gradle), Python (pip, FastAPI/Flask), and JavaScript/TypeScript (npm, React, Vite) without requiring manual configuration.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono pt-2">
                <span className="px-3 py-1 rounded bg-dark-800 border border-gray-700 text-indigo-400">Java / Maven</span>
                <span className="px-3 py-1 rounded bg-dark-800 border border-gray-700 text-cyan-400">Python / FastAPI</span>
                <span className="px-3 py-1 rounded bg-dark-800 border border-gray-700 text-emerald-400">React / Vite</span>
              </div>
            </div>

            {/* Tile 2: OWASP Security (4 cols) */}
            <div className="md:col-span-4 p-8 rounded-2xl bg-dark-900 border border-gray-800 space-y-4 glass-card-interactive">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">OWASP Security Scans</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Continuous vulnerability scanning & custom rule engine detecting CVEs, exposed secrets, and outdated dependencies.
              </p>
            </div>

            {/* Tile 3: Docker Containerization (4 cols) */}
            <div className="md:col-span-4 p-8 rounded-2xl bg-dark-900 border border-gray-800 space-y-4 glass-card-interactive">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Multi-Stage Docker Support</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Auto-generates multi-stage Dockerfiles and docker-compose.yml files tailored to detected project frameworks.
              </p>
            </div>

            {/* Tile 4: AI Assistant (8 cols) */}
            <div className="md:col-span-8 p-8 rounded-2xl bg-dark-900 border border-gray-800 space-y-4 glass-card-interactive">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Optional AI Error Assistant</h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
                Translates cryptic build errors, stack traces, and security findings into plain-English diagnostics, root cause analysis, and step-by-step code fixes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section className="py-24 bg-dark-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-white">Loved by Developers & Judges</h2>
            <p className="text-xs text-gray-400">What users say about DevForge's unified developer workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {[
              { name: "Alex Chen", role: "Computer Science Student", text: "DevForge allowed our Hackathon team to build, test, and containerize our Spring Boot API in minutes without wasting hours writing Dockerfiles.", stars: 5 },
              { name: "Sarah Jenkins", role: "Startup Technical Lead", text: "Having builds, OWASP security scans, and health scores in one unified console eliminated the need for complex Jenkins configurations.", stars: 5 },
              { name: "Prof. Marcus Vance", role: "College Hackathon Judge", text: "The 0–100 Health Score and AI Assistant provide immediate clarity into code quality and architecture readiness.", stars: 5 }
            ].map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-dark-800/80 border border-gray-800 space-y-4 font-mono text-xs glass-card-interactive">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-300 leading-relaxed italic font-sans text-xs">"{t.text}"</p>
                <div className="pt-2 border-t border-gray-800">
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-dark-800/40 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400">Everything you need to know about DevForge</p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl bg-dark-900 border border-gray-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-white hover:text-brand-400 transition"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-brand-400 shrink-0" />
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-gray-300 font-sans text-xs leading-relaxed border-t border-gray-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-dark-900 border-t border-gray-800 text-center text-xs text-gray-500 font-mono">
        DevForge — Forge. Build. Ship. &copy; 2026 Integrated Developer Infrastructure Platform.
      </footer>
    </div>
  );
};
