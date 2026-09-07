package com.devforge;

import com.devforge.dto.AuthDTOs.RegisterRequest;
import com.devforge.dto.ProjectDTOs.CreateProjectRequest;
import com.devforge.entity.User;
import com.devforge.repository.UserRepository;
import com.devforge.service.ProjectService;
import com.devforge.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DevForgeApplication {

    public static void main(String[] args) {
        SpringApplication.run(DevForgeApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(UserService userService, ProjectService projectService, UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                // Seed default demo user
                RegisterRequest reg = new RegisterRequest("DevForge Demo User", "demo@devforge.io", "password123");
                userService.register(reg);

                User user = userRepository.findByEmail("demo@devforge.io").orElseThrow();

                // Seed Demo Projects
                CreateProjectRequest p1 = new CreateProjectRequest();
                p1.setName("DevForge Demo API");
                p1.setRepositoryUrl("https://github.com/devforge/demo-api-service");
                p1.setLanguage("Java");
                p1.setBuildSystem("Maven");
                p1.setDefaultBranch("main");

                CreateProjectRequest p2 = new CreateProjectRequest();
                p2.setName("Cloud Microservice Gateway");
                p2.setRepositoryUrl("https://github.com/devforge/cloud-microservice");
                p2.setLanguage("Python");
                p2.setBuildSystem("pip");
                p2.setDefaultBranch("main");

                CreateProjectRequest p3 = new CreateProjectRequest();
                p3.setName("DevForge Console Frontend");
                p3.setRepositoryUrl("https://github.com/devforge/web-console");
                p3.setLanguage("TypeScript / JavaScript");
                p3.setBuildSystem("npm");
                p3.setDefaultBranch("main");

                projectService.createProject(p1, user.getId());
                projectService.createProject(p2, user.getId());
                projectService.createProject(p3, user.getId());

                System.out.println(">>> DevForge Demo Data successfully initialized <<<");
            }
        };
    }
}
