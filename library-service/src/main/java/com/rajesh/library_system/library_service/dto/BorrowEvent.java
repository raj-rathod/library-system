package com.rajesh.library_system.library_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BorrowEvent implements Serializable {

    private String eventType;
    private Long borrowId;
    private Long userId;
    private Long bookId;
    private Integer quantity;

}
