package com.rajesh.library_system.user_service.component;

import com.rajesh.library_system.user_service.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtConfig jwtConfig;

    private Key key;

    @PostConstruct
    public void init() {

        this.key = Keys.hmacShaKeyFor(
                jwtConfig
                        .getSecret()
                        .getBytes(StandardCharsets.UTF_8)
        );
    }


    public String generateAccessToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("userId", user.getId())
                .claim("name", user.getName())
                .claim("role", user.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getExpiration()))
                .signWith(key) // ✅ updated
                .compact();
    }

    public String generateRefreshToken() {
        return UUID.randomUUID().toString();
    }
}