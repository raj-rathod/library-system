package com.rajesh.library_system.library_service.mapper;

import com.rajesh.library_system.library_service.dto.BookRequestDTO;
import com.rajesh.library_system.library_service.dto.BookResponseDTO;
import com.rajesh.library_system.library_service.entity.Book;
import com.rajesh.library_system.library_service.entity.Department;

public class BookMapper {

    public static Book toEntity(BookRequestDTO dto, Department department){
        return Book.builder()
                .title(dto.getTitle())
                .isbn(dto.getIsbn())
                .author(dto.getAuthor())
                .quantity(dto.getQuantity())
                .status(dto.getStatus())
                .department(department)
                .build();
    }

    public static BookResponseDTO toDTO(Book book){
        return BookResponseDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .quantity(book.getQuantity())
                .status(book.getStatus())
                .departmentId(book.getDepartment().getId())
                .departmentName(book.getDepartment().getName())
                .build();
    }
}
