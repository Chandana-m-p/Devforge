package com.devforge.dto;

public class AuthDTOs {

    public static class LoginRequest {
        private String email;
        private String password;

        public LoginRequest() {}
        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;

        public RegisterRequest() {}
        public RegisterRequest(String name, String email, String password) {
            this.name = name;
            this.email = email;
            this.password = password;
        }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private String token;
        private String tokenType = "Bearer";
        private Long id;
        private String name;
        private String email;

        public AuthResponse(String token, Long id, String name, String email) {
            this.token = token;
            this.id = id;
            this.name = name;
            this.email = email;
        }

        public String getToken() { return token; }
        public String getTokenType() { return tokenType; }
        public Long getId() { return id; }
        public String getName() { return name; }
        public String getEmail() { return email; }
    }
}
