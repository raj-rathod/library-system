import { Component } from '@angular/core';
import { BookList } from '../../../../shared/components/book-list/book-list';

@Component({
  selector: 'app-admin-books',
  imports: [
    BookList
  ],
  templateUrl: './admin-books.html',
  styleUrl: './admin-books.css',
})
export class AdminBooks {}
