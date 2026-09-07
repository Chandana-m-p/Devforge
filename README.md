# DevForge — Forge. Build. Ship.

One unified integrated developer infrastructure platform for building, testing, securing, and containerizing your software projects.

---

## 🚀 Overview

**DevForge** eliminates developer tool fragmentation by acting as an orchestration layer over GitHub, Maven, Gradle, JUnit, OWASP, Docker, and CI/CD pipelines.

Instead of manually writing scripts and connecting separate tools, DevForge provides a single, beginner-friendly workstation that automatically analyzes repositories, executes build/test suites, runs security dependency scans, generates multi-stage Dockerfiles, calculates a 0–100 Project Health Score, and provides AI-assisted error explanations.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Vanilla CSS dark developer console palette
- **Icons**: Lucide React
- **Routing**: React Router v6

### Backend
- **Framework**: Java 17 + Spring Boot 3.2.x
- **Security**: Spring Security + JWT authentication (BCrypt password hashing)
- **Database**: PostgreSQL 15 & H2 in-memory runtime fallback
- **ORM**: Spring Data JPA & Hibernate

### AI Microservice
- **Framework**: Python 3.10 + FastAPI + Uvicorn
- **Engine**: Rule-Engine & LLM diagnostic provider

### Containerization & CI/CD
- **Docker**: Multi-stage Dockerfiles & Docker Compose
- **GitHub Actions**: Auto-generated `.github/workflows/devforge-ci.yml`

---

## 📁 Repository Structure

```
Devforge/
├── frontend/             # Vite + React 18 + Tailwind CSS
├── backend/              # Java 17 + Spring Boot 3 + JWT Security
├── ai-service/           # Python FastAPI AI Error Assistant
├── docker-compose.yml    # Full-stack orchestration manifest
├── .env.example          # Environment variables template
└── README.md
```

---

## ⚡ Quick Start Guide

### 1. Local Development Mode

#### Run Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
```
*Backend API available at: `http://localhost:8080`*

#### Run React Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend available at: `http://localhost:3000`*

#### Run Optional Python AI Service
```bash
cd ai-service
pip install -r requirements.txt
python main.py
```
*AI Service available at: `http://localhost:8000`*

---

### 2. Docker Compose Execution

Run the complete multi-container stack with one command:
```bash
docker-compose up --build
```

---

## 🎯 Demo Mode & Judging Evaluation

DevForge includes a 1-click **Demo Mode** toggle in the navigation bar. If GitHub tokens, Docker daemons, or Python services are unavailable in evaluation environments, DevForge seamlessly operates using realistic pre-seeded project telemetry ("DevForge Demo API", "Cloud Microservice Gateway", "Console Frontend"), featuring live pipeline execution simulations, test reports, OWASP findings, and health score calculations.
