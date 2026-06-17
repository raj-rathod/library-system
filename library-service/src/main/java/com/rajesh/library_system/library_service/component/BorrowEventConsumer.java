package com.rajesh.library_system.library_service.component;

import com.rajesh.library_system.library_service.dto.BorrowEvent;
import com.rajesh.library_system.library_service.entity.Book;
import com.rajesh.library_system.library_service.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BorrowEventConsumer {

    private final BookRepository repository;

    @KafkaListener(
            topics = "borrow-events",
            groupId = "book-service-group"
    )
    public void consume(BorrowEvent event) {

        System.out.println(
                "Received Event => " + event.getEventType()
        );

        Book book =
                repository.findById(event.getBookId())
                        .orElseThrow();

        switch (event.getEventType()) {

            case "BORROW_REQUESTED" ->{
                if(book.getQuantity() > event.getQuantity()){
                    book.setQuantity(
                            book.getQuantity() - event.getQuantity()
                    );

                    System.out.println(
                            "Quantity Decreased"
                    );
                }
            }

            case "BORROW_RETURNED" -> {

                book.setQuantity(
                        book.getQuantity() + event.getQuantity()
                );

                System.out.println(
                        "Quantity Increased"
                );
            }

            case "BORROW_REJECTED" -> {

                book.setQuantity(
                        book.getQuantity() + event.getQuantity()
                );

                System.out.println(
                        "Quantity Increased, BORROW REJECTED"
                );
            }
            case "BORROW_DELETED" -> {

                book.setQuantity(
                        book.getQuantity() + event.getQuantity()
                );

                System.out.println(
                        "Quantity Increased, BORROW DELETED"
                );
            }
        }

        repository.save(book);
    }
}
