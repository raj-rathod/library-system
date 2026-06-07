package com.rajesh.library_system.borrow_service.dto;

import com.rajesh.library_system.borrow_service.enums.BorrowStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class BorrowResponseDTO {
    private Long id;

    private Long userId;

    private Long bookId;

    private Long quantity;

    private LocalDate borrowDate;

    private LocalDate returnDate;

    private BorrowStatus status;
}
