package com.rajesh.library_system.library_service.mapper;


import com.rajesh.library_system.library_service.dto.DepartmentRequestDTO;
import com.rajesh.library_system.library_service.dto.DepartmentResponseDTO;
import com.rajesh.library_system.library_service.entity.Department;

public class DepartmentMapper {
    public static Department toEntity(DepartmentRequestDTO dto){
        return Department.builder()
                .name(dto.getName())
                .status(dto.getStatus())
                .build();
    }

    public static DepartmentResponseDTO toDTO(Department department){
        return new DepartmentResponseDTO(
                department.getId(),
                department.getName(),
                department.getStatus()
        );
    }
}
