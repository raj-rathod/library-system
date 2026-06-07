import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Book } from '../../../models/book.interface';
import { HttpService } from '../../../services/httpservice';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateBook } from '../add-update-book/add-update-book';

@Component({
  selector: 'app-book-list',
  imports: [
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit {
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
       this.httpService.getAllBooks().subscribe({
          next: (books) => {
            this.dataSource.data = books;
          },
          error: (err) => {
            console.error(err);
          }
      });
    }


    openDialog() {
          const dialogRef = this.dialog.open(AddUpdateBook, {
            width: '600px',
            height:"430px",
            disableClose: true,
            data: { title: "Add Book", isNew:true}
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
      
    editBook(book:Book): void{
       const dialogRef = this.dialog.open(AddUpdateBook, {
           width: '600px',
            height:"430px",
            disableClose: true,
            data: { title: "Update Book", isNew:false, book:book}
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

    deleteBook(book:Book): void{
        this.httpService.deleteBook(book.id).subscribe({
          next:()=>{
            this.loadBooks();
          }
        })
    }

}
