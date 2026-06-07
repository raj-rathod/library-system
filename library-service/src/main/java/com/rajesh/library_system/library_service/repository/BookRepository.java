package com.rajesh.library_system.library_service.repository;

import com.rajesh.library_system.library_service.entity.Book;
import com.rajesh.library_system.library_service.enums.BookStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByStatus(BookStatus status);
}
