import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Borrow, BorrowStatus } from '../../../models/borrowed.interface';
import { HttpService } from '../../../services/httpservice';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-borrowed-book-list',
  imports: [
    MatTableModule, 
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSortModule, 
    CommonModule
  ],
  templateUrl: './borrowed-book-list.html',
  styleUrl: './borrowed-book-list.css',
})
export class BorrowedBookList {
  dataSource = new MatTableDataSource<Borrow>([]);

  borrowStatus = BorrowStatus

  displayedColumns: string[] = [
    'id',
    'userId',
    'bookId',
    'borrowDate',
    'returnDate',
    'status',
    'actions'
  ];

  constructor(private httpService:HttpService){}


  ngOnInit(): void {
    this.loadBorrow();
  }

  loadBorrow():void {
    this.httpService.getAllBorroedBooks().subscribe({
        next: (res)=>{
          this.dataSource.data = res;
        }
    });
  }


  deleteBorrow(borrow:any):void{
    this.httpService.deleteBorrowed(borrow.id).subscribe({
      next:()=>{
        this.loadBorrow();
      }
    })
  }

  requestUpdate(borrow:Borrow, status:BorrowStatus){
     const reqObj = {...borrow};
     reqObj.status = status;

     this.httpService.updateBorrowed(borrow.id, reqObj).subscribe({
         next:()=>{
          this.loadBorrow();
         }
     })
    
  }

}
