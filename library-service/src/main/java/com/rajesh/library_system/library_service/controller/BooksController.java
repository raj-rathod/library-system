package com.rajesh.library_system.library_service.controller;

import com.rajesh.library_system.library_service.dto.BookRequestDTO;
import com.rajesh.library_system.library_service.dto.BookResponseDTO;
import com.rajesh.library_system.library_service.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BooksController {

    private final BookService service;


    // CREATE book
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @PostMapping("/add")
    public BookResponseDTO create(@Valid @RequestBody BookRequestDTO dto) {
        return service.create(dto);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public BookResponseDTO get(@PathVariable Long id) {
        return service.get(id);
    }

    // GET ALL
    @GetMapping
    public List<BookResponseDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/available")
    public List<BookResponseDTO> getAvailableBooks() {
        return service.getAvailableBooks();
    }

    // UPDATE
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @PutMapping("/{id}")
    public BookResponseDTO update(@PathVariable Long id,
                                  @Valid @RequestBody BookRequestDTO dto) {
        return service.update(id, dto);
    }

    // DELETE
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
