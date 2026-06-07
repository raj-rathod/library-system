package com.rajesh.library_system.user_service.service;

import com.rajesh.library_system.user_service.component.JwtConfig;
import com.rajesh.library_system.user_service.component.JwtUtil;
import com.rajesh.library_system.user_service.dto.LoginRequestDto;
import com.rajesh.library_system.user_service.entity.User;
import com.rajesh.library_system.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authManager;
    private final UserRepository repo;
    private final JwtUtil jwtUtil;
    private final JwtConfig jwtConfig;


    public Map<String, String> login(LoginRequestDto request) {

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = repo.findByEmail(request.getEmail()).get();

        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken();

        user.setRefreshToken(refreshToken);
        user.setRefreshTokenExpiry(LocalDateTime.now().plusDays(jwtConfig.getRefreshDays()));
        repo.save(user);

        return Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken,
                "role", user.getRole().name(),
                "name", user.getName()
        );
    }

    public Map<String, String> refresh(String refreshToken) {

        User user = repo.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (user.getRefreshTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Refresh token expired");
        }

        String newAccessToken = jwtUtil.generateAccessToken(user);

        return Map.of("accessToken", newAccessToken);
    }
}
