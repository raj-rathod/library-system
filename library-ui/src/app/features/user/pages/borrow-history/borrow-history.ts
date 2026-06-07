import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Borrow } from '../../../../models/borrowed.interface';
import { HttpService } from '../../../../services/httpservice';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-borrow-history',
  imports: [
    MatTableModule, 
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSortModule, 
    CommonModule
  ],
  templateUrl: './borrow-history.html',
  styleUrl: './borrow-history.css',
})
export class BorrowHistory {
  dataSource = new MatTableDataSource<Borrow>([]);

  displayedColumns: string[] = [
    'id',
    'bookId',
    'quantity',
    'borrowDate',
    'returnDate',
    'status',
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

}
