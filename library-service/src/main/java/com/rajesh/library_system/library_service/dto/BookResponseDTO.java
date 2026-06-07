package com.rajesh.library_system.library_service.dto;

import com.rajesh.library_system.library_service.enums.BookStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class BookResponseDTO {
    private Long id;

    private String title;

    private String author;

    private String isbn;

    private Integer quantity;

    private BookStatus status;

    private Long departmentId;

    private String departmentName;
}
