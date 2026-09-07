import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Box, CheckCircle2, Play } from 'lucide-react';

export const DockerPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <Box className="w-6 h-6 text-cyan-400" />
              <span>Containerization & Docker Orchestration</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Automatic multi-stage Dockerfile generation and docker-compose deployment manifests</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gray-800 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="font-bold text-sm text-white">Generated Dockerfile Preview</div>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Multi-Stage JDK 17
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
{`# Multi-stage Java / Spring Boot Dockerfile
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

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">Image Tag: devforge/demo-api-service:latest</span>
              <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition">
                <Play className="w-3.5 h-3.5" />
                <span>Build Container Image</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
