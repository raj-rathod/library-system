package com.rajesh.library_system.library_service.service;

import com.rajesh.library_system.library_service.dto.BookRequestDTO;
import com.rajesh.library_system.library_service.dto.BookResponseDTO;
import com.rajesh.library_system.library_service.entity.Book;
import com.rajesh.library_system.library_service.entity.Department;
import com.rajesh.library_system.library_service.enums.BookStatus;
import com.rajesh.library_system.library_service.mapper.BookMapper;
import com.rajesh.library_system.library_service.repository.BookRepository;
import com.rajesh.library_system.library_service.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository repo;
    private final DepartmentRepository departRepo;

    // CREATE
    public BookResponseDTO create(BookRequestDTO dto) {

        Department department = departRepo.findById(dto.getDepartmentId()).orElseThrow(
                () -> new RuntimeException("Department not found!")
        );

        Book book = BookMapper.toEntity(dto, department);

        Book savedBook= repo.save(book);

        return BookMapper.toDTO(savedBook);
    }

    public List<BookResponseDTO> getAvailableBooks() {

        return repo
                .findByStatus(BookStatus.AVAILABLE)
                .stream()
                .map(BookMapper::toDTO)
                .toList();
    }

    // GET BY ID
    public BookResponseDTO get(Long id) {
        Book book = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return BookMapper.toDTO(book);
    }

    // GET ALL
    public List<BookResponseDTO> getAll() {
        return repo.findAll()
                .stream()
                .map(BookMapper::toDTO)
                .collect(Collectors.toList());
    }

    // UPDATE
    public BookResponseDTO update(Long id, BookRequestDTO dto) {
        Book book = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setIsbn(dto.getIsbn());
        book.setQuantity(dto.getQuantity());
        book.setStatus(dto.getStatus());

        return BookMapper.toDTO(repo.save(book));
    }

    // DELETE
    public void delete(Long id) {
        Book book = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setStatus(BookStatus.ARCHIVED);
        repo.save(book);
    }
}
