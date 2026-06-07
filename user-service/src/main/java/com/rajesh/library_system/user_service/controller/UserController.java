package com.rajesh.library_system.user_service.controller;

import com.rajesh.library_system.user_service.dto.UserRequestDto;
import com.rajesh.library_system.user_service.dto.UserResponseDto;
import com.rajesh.library_system.user_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;


    // CREATE User
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public UserResponseDto create(@Valid @RequestBody UserRequestDto dto) {
        return service.create(dto);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public UserResponseDto get(@PathVariable Long id) {
        return service.get(id);
    }

    // GET ALL
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserResponseDto> getAll() {
        return service.getAll();
    }

    // UPDATE
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public UserResponseDto update(@PathVariable Long id,
                                  @Valid @RequestBody UserRequestDto dto) {
        return service.update(id, dto);
    }

    // DELETE
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
