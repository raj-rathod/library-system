package com.rajesh.library_system.user_service.controller;

import com.rajesh.library_system.user_service.dto.LoginRequestDto;
import com.rajesh.library_system.user_service.dto.UserRequestDto;
import com.rajesh.library_system.user_service.dto.UserResponseDto;
import com.rajesh.library_system.user_service.service.AuthService;
import com.rajesh.library_system.user_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;
    private final UserService userService;


    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequestDto request) {
        return service.login(request);
    }

    @PostMapping("/refresh")
    public Map<String, String> refresh(@RequestParam String refreshToken) {
        return service.refresh(refreshToken);
    }
}
