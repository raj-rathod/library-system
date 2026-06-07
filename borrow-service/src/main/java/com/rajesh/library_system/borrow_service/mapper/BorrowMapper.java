package com.rajesh.library_system.borrow_service.mapper;

import com.rajesh.library_system.borrow_service.dto.BorrowRequestDTO;
import com.rajesh.library_system.borrow_service.dto.BorrowResponseDTO;
import com.rajesh.library_system.borrow_service.entity.Borrow;

public class BorrowMapper {

    public static Borrow toEntity(BorrowRequestDTO dto){
        return Borrow.builder()
                .bookId(dto.getBookId())
                .quantity(dto.getQuantity())
                .borrowDate(dto.getBorrowDate())
                .returnDate(dto.getReturnDate())
                .status(dto.getStatus())
                .build();
    }

    public static BorrowResponseDTO toDTO(Borrow borrow){
        return new BorrowResponseDTO(
                borrow.getId(),
                borrow.getUserId(),
                borrow.getBookId(),
                borrow.getQuantity(),
                borrow.getBorrowDate(),
                borrow.getReturnDate(),
                borrow.getStatus()
        );
    }
}
