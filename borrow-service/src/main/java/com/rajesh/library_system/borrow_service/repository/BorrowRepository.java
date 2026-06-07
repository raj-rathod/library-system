package com.rajesh.library_system.borrow_service.repository;

import com.rajesh.library_system.borrow_service.entity.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow, Long> {
}
