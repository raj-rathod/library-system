package com.rajesh.library_system.library_service.dto;

import com.rajesh.library_system.library_service.enums.DepartmentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DepartmentResponseDTO {
    private Long id;

    private String name;

    private DepartmentStatus status;
}
