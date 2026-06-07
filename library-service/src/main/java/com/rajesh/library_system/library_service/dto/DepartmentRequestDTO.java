package com.rajesh.library_system.library_service.dto;

import com.rajesh.library_system.library_service.enums.DepartmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class DepartmentRequestDTO {
    @NotBlank
    private String name;

    @NotNull
     private DepartmentStatus status;

}
