package com.rajesh.library_system.borrow_service.enums;

public enum BorrowStatus {

    REQUESTED,   // User requested a book

    APPROVED,    // Librarian approved request

    BORROWED,    // Book issued to user

    RETURNED,    // Book returned

    OVERDUE,     // Return date exceeded

    REJECTED     // Request rejected
}
