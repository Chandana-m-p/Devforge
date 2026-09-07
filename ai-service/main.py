from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="DevForge AI Assistant Microservice",
    description="Intelligent Error Diagnostics & Security Finding Explainability API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ErrorExplanationRequest(BaseModel):
    errorLog: str
    context: Optional[str] = "Build / Test Execution"
    projectType: Optional[str] = "Java / Spring Boot"

class SecurityExplanationRequest(BaseModel):
    title: str
    description: str
    severity: str

class AIExplanationResponse(BaseModel):
    whatWentWrong: str
    whyItHappened: str
    howToFix: str
    exampleSolution: str
    confidenceScore: str

@app.get("/health")
def health_check():
    return {"status": "UP", "service": "DevForge AI Microservice", "model": "Rule-Engine + LLM Gateway"}

@app.post("/explain-error", response_model=AIExplanationResponse)
def explain_error(request: ErrorExplanationRequest):
    log = request.errorLog.lower()

    if "nullpointerexception" in log or "null pointer" in log:
        return AIExplanationResponse(
            whatWentWrong="NullPointerException occurred in application thread execution.",
            whyItHappened="An operation attempted to dereference an uninitialized variable or a null return value from a repository/service method.",
            howToFix="Perform a explicit null check, use Optional wrapper, or initialize default instance.",
            exampleSolution="if (user != null && user.getEmail() != null) { ... } // Or: Optional.ofNullable(user)",
            confidenceScore="98%"
        )
    elif "cannot find module" in log or "classnotfoundexception" in log or "nosuchmethoderror" in log:
        return AIExplanationResponse(
            whatWentWrong="Missing dependency module or classpath class missing.",
            whyItHappened="The required package was referenced in source code but is missing from build dependencies or node_modules.",
            howToFix="Add dependency declaration to pom.xml or package.json and execute dependency install.",
            exampleSolution="mvn dependency:resolve   # Or: npm install --save <package>",
            confidenceScore="95%"
        )
    elif "assertionerror" in log or "test failed" in log:
        return AIExplanationResponse(
            whatWentWrong="Automated unit test assertion check failed.",
            whyItHappened="The computed return value from target logic differed from the expected mock value.",
            howToFix="Review recent code changes in target class, adjust assertion, or fix logic mismatch.",
            exampleSolution="assertEquals(expected, actual);",
            confidenceScore="93%"
        )

    return AIExplanationResponse(
        whatWentWrong="Pipeline Build/Compile Target Failure.",
        whyItHappened="The build tool (Maven/Gradle/npm) encountered a syntax error or failed compilation goal.",
        howToFix="Check syntax in modified files, verify JDK/Node compatibility, and clean target directory.",
        exampleSolution="mvn clean compile -DskipTests",
        confidenceScore="90%"
    )

@app.post("/explain-security", response_model=AIExplanationResponse)
def explain_security(request: SecurityExplanationRequest):
    return AIExplanationResponse(
        whatWentWrong=f"Vulnerability Finding: {request.title} ({request.severity} Severity)",
        whyItHappened=f"Impact: {request.description}",
        howToFix="Upgrade target dependency version in package/pom manifest, sanitize user inputs, and apply security patches.",
        exampleSolution="// Update dependency in pom.xml / package.json to latest stable release",
        confidenceScore="97%"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
