package com.rajesh.library_system.borrow_service.service;

import com.rajesh.library_system.borrow_service.dto.BorrowRequestDTO;
import com.rajesh.library_system.borrow_service.dto.BorrowResponseDTO;
import com.rajesh.library_system.borrow_service.entity.Borrow;
import com.rajesh.library_system.borrow_service.mapper.BorrowMapper;
import com.rajesh.library_system.borrow_service.repository.BorrowRepository;
import com.rajesh.library_system.borrow_service.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BorrowService {

    private final BorrowRepository repo;

    // CREATE
    public BorrowResponseDTO create(BorrowRequestDTO dto) {
        Long userId = SecurityUtil.getCurrentUserId();
        Borrow borrow = BorrowMapper.toEntity(dto);
        borrow.setUserId(userId);

        System.out.println(borrow.toString());

        Borrow savedBorrow= repo.save(borrow);

        return BorrowMapper.toDTO(savedBorrow);
    }

    // GET BY ID
    public BorrowResponseDTO get(Long id) {
        Borrow borrow = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Borrow not found"));
        return BorrowMapper.toDTO(borrow);
    }

    // GET ALL
    public List<BorrowResponseDTO> getAll() {
        return repo.findAll()
                .stream()
                .map(BorrowMapper::toDTO)
                .collect(Collectors.toList());
    }

    // UPDATE
    public BorrowResponseDTO update(Long id, BorrowRequestDTO dto) {
        Borrow borrow = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Borrow not found"));
        borrow.setBookId(dto.getBookId());
        borrow.setBorrowDate(dto.getBorrowDate());
        borrow.setReturnDate(dto.getReturnDate());
        borrow.setStatus(dto.getStatus());

        return BorrowMapper.toDTO(repo.save(borrow));
    }

    // DELETE
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Borrow not found");
        }
        repo.deleteById(id);
    }

}
