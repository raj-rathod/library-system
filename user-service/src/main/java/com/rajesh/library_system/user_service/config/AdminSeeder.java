package com.rajesh.library_system.user_service.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.rajesh.library_system.user_service.entity.User;
import com.rajesh.library_system.user_service.enums.Role;
import com.rajesh.library_system.user_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (!userRepository.existsByEmail("admin@library.com")) {

            User admin = new User();

            admin.setName("Super Admin");
            admin.setEmail("admin@library.com");
            admin.setPassword(
                    passwordEncoder.encode("123456")
            );
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);

            System.out.println("Super Admin Created");
        }
    }
}
