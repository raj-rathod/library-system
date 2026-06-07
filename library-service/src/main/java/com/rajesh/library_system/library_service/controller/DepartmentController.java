package com.rajesh.library_system.library_service.controller;

import com.rajesh.library_system.library_service.dto.DepartmentRequestDTO;
import com.rajesh.library_system.library_service.dto.DepartmentResponseDTO;
import com.rajesh.library_system.library_service.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService service;

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @PostMapping("/add")
    public DepartmentResponseDTO create(@Valid @RequestBody DepartmentRequestDTO dto){
         return service.create(dto);
    }

    @GetMapping
    public List<DepartmentResponseDTO> getAll(){
        return service.getAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @PatchMapping("/{id}")
    public DepartmentResponseDTO update( @PathVariable Long id, @Valid @RequestBody DepartmentRequestDTO dto){
        return service.update(id, dto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
}
