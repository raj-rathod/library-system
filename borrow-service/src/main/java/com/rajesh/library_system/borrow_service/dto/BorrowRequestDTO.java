package com.rajesh.library_system.borrow_service.dto;

import com.rajesh.library_system.borrow_service.enums.BorrowStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BorrowRequestDTO {

    @NotNull
    private Long bookId;

    @NotNull
    private Long quantity;

    @NotNull
    private LocalDate borrowDate;

    @NotNull
    private LocalDate returnDate;

    @NotNull
    private BorrowStatus status;
}
