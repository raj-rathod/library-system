package com.rajesh.library_system.user_service.dto;

import com.rajesh.library_system.user_service.enums.Role;
import lombok.*;

@Getter
@AllArgsConstructor
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private Role role;
}

