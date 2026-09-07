package com.devforge.dto;

public class AIDTOs {

    public static class AIExplanationRequest {
        private String errorLog;
        private String context;
        private String projectType;

        public AIExplanationRequest() {}
        public AIExplanationRequest(String errorLog, String context, String projectType) {
            this.errorLog = errorLog;
            this.context = context;
            this.projectType = projectType;
        }

        public String getErrorLog() { return errorLog; }
        public void setErrorLog(String errorLog) { this.errorLog = errorLog; }

        public String getContext() { return context; }
        public void setContext(String context) { this.context = context; }

        public String getProjectType() { return projectType; }
        public void setProjectType(String projectType) { this.projectType = projectType; }
    }

    public static class AIExplanationResponse {
        private String whatWentWrong;
        private String whyItHappened;
        private String howToFix;
        private String exampleSolution;
        private String confidenceScore;

        public AIExplanationResponse() {}

        public AIExplanationResponse(String whatWentWrong, String whyItHappened, String howToFix, String exampleSolution, String confidenceScore) {
            this.whatWentWrong = whatWentWrong;
            this.whyItHappened = whyItHappened;
            this.howToFix = howToFix;
            this.exampleSolution = exampleSolution;
            this.confidenceScore = confidenceScore;
        }

        public String getWhatWentWrong() { return whatWentWrong; }
        public void setWhatWentWrong(String whatWentWrong) { this.whatWentWrong = whatWentWrong; }

        public String getWhyItHappened() { return whyItHappened; }
        public void setWhyItHappened(String whyItHappened) { this.whyItHappened = whyItHappened; }

        public String getHowToFix() { return howToFix; }
        public void setHowToFix(String howToFix) { this.howToFix = howToFix; }

        public String getExampleSolution() { return exampleSolution; }
        public void setExampleSolution(String exampleSolution) { this.exampleSolution = exampleSolution; }

        public String getConfidenceScore() { return confidenceScore; }
        public void setConfidenceScore(String confidenceScore) { this.confidenceScore = confidenceScore; }
    }
}
