package com.rajesh.library_system.library_service.dto;

import com.rajesh.library_system.library_service.enums.BookStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookRequestDTO {
   @NotBlank
    private String title;

   @NotBlank
    private String author;

    private String isbn;

    @NotNull
    private Integer quantity;

    @NotNull
    private BookStatus status;

    @NotNull
    private Long departmentId;

}
