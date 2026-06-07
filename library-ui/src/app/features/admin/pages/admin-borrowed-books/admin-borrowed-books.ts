import { Component} from '@angular/core';
import { BorrowedBookList } from '../../../../shared/components/borrowed-book-list/borrowed-book-list';


@Component({
  selector: 'app-admin-borrowed-books',
  imports: [
    BorrowedBookList
  ],
  templateUrl: './admin-borrowed-books.html',
  styleUrl: './admin-borrowed-books.css',
})
export class AdminBorrowedBooks {




}
