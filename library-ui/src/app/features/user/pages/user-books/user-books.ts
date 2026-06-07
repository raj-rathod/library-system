import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Book } from '../../../../models/book.interface';
import { HttpService } from '../../../../services/httpservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { BorrowBook } from '../borrow-book/borrow-book';

@Component({
  selector: 'app-user-books',
  imports: [
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './user-books.html',
  styleUrl: './user-books.css',
})
export class UserBooks {
  readonly dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<Book>();

  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'isbn',
    'quantity',
    'departmentName',
    'status',
    'actions'
];
  
   constructor(private httpService: HttpService) {}
   
    ngOnInit(): void {
      this.loadBooks();
    }

    loadBooks():void{
       this.httpService.getAllAvailable().subscribe({
          next: (books) => {
            this.dataSource.data = books;
          },
          error: (err) => {
            console.error(err);
          }
      });
    }

    borrowBook(book:Book):void {
       const dialogRef = this.dialog.open(BorrowBook, {
            width: '600px',
            height:"300px",
            disableClose: true,
            data: { title: "Borrow Book", book}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            
            if (result) {
              switch (result.action) {
                case 'SAVE':
                  this.loadBooks();
                  break;
      
                case 'DELETE':
                  this.loadBooks();
                  break;
      
                case 'CANCEL':
                  break;
              }
            }
        });
    }

}
