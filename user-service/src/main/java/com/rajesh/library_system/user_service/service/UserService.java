package com.rajesh.library_system.user_service.service;

import com.rajesh.library_system.user_service.dto.UserRequestDto;
import com.rajesh.library_system.user_service.dto.UserResponseDto;
import com.rajesh.library_system.user_service.entity.User;
import com.rajesh.library_system.user_service.mapper.UserMapper;
import com.rajesh.library_system.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;


    // CREATE
    public UserResponseDto create(UserRequestDto dto) {
        if (repo.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = UserMapper.toEntity(dto);

        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        User savedUser = repo.save(user);

        return UserMapper.toDTO(savedUser);
    }

    // GET BY ID
    public UserResponseDto get(Long id) {
        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.toDTO(user);
    }

    // GET ALL
    public List<UserResponseDto> getAll() {
        return repo.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    // UPDATE
    public UserResponseDto update(Long id, UserRequestDto dto) {
        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        return UserMapper.toDTO(repo.save(user));
    }

    // DELETE
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        repo.deleteById(id);
    }
}
