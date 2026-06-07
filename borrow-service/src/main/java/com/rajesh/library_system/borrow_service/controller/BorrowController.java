package com.rajesh.library_system.borrow_service.controller;

import com.rajesh.library_system.borrow_service.dto.BorrowRequestDTO;
import com.rajesh.library_system.borrow_service.dto.BorrowResponseDTO;
import com.rajesh.library_system.borrow_service.service.BorrowService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/borrows")
public class BorrowController {
     private final BorrowService service;

    // CREATE BORROW REQUEST
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN','USER')")
    @PostMapping("/add")
    public BorrowResponseDTO create(@Valid @RequestBody BorrowRequestDTO dto) {
        return service.create(dto);
    }

    // GET BY ID
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN','USER')")
    @GetMapping("/{id}")
    public BorrowResponseDTO get(@PathVariable Long id) {
        return service.get(id);
    }

    // GET ALL
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN', 'USER')")
    @GetMapping
    public List<BorrowResponseDTO> getAll() {
        return service.getAll();
    }

    // UPDATE
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @PutMapping("/{id}")
    public BorrowResponseDTO update(@PathVariable Long id,
                                  @Valid @RequestBody BorrowRequestDTO dto) {
        return service.update(id, dto);
    }

    // DELETE
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
