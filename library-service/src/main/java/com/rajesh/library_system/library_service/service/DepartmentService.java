package com.rajesh.library_system.library_service.service;

import com.rajesh.library_system.library_service.dto.DepartmentRequestDTO;
import com.rajesh.library_system.library_service.dto.DepartmentResponseDTO;
import com.rajesh.library_system.library_service.entity.Department;
import com.rajesh.library_system.library_service.enums.DepartmentStatus;
import com.rajesh.library_system.library_service.mapper.DepartmentMapper;
import com.rajesh.library_system.library_service.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository repo;

    public DepartmentResponseDTO create(DepartmentRequestDTO dto){

        if(repo.existsByName(dto.getName())){
            throw new RuntimeException(
                    "Department (" +dto.getName()+ ") already exists"
            );
        }

        Department department = DepartmentMapper.toEntity(dto);
        department = repo.save(department);

        return DepartmentMapper.toDTO(department);

    }

    public List<DepartmentResponseDTO> getAll(){
        return repo.findAll()
                .stream()
                .map(DepartmentMapper::toDTO)
                .collect(Collectors.toList());
    }


    public DepartmentResponseDTO update(Long id, DepartmentRequestDTO dto){
        Department department = repo.findById(id).orElseThrow(() -> new RuntimeException("Department not found!") );
        department.setName(dto.getName());
        department.setStatus(dto.getStatus());

        return DepartmentMapper.toDTO(repo.save(department));
    }

    // DELETE
    public void delete(Long id) {
        Department department = repo.findById(id).orElseThrow(() -> new RuntimeException("Department not found!") );
        department.setStatus(DepartmentStatus.INACTIVE);
        repo.save(department);
    }


}
