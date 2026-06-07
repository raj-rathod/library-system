package com.rajesh.library_system.user_service.mapper;

import com.rajesh.library_system.user_service.dto.UserRequestDto;
import com.rajesh.library_system.user_service.dto.UserResponseDto;
import com.rajesh.library_system.user_service.entity.User;

public class UserMapper {

    public static User toEntity(UserRequestDto dto) {
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .build();
    }

    public static UserResponseDto toDTO(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
