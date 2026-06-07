import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from '../../../services/httpservice';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Department } from '../../../models/department.interfcae';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateDepartment } from '../add-update-department/add-update-department';

@Component({
  selector: 'app-department-list',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
})
export class DepartmentList implements OnInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = [
  'id',
  'name',
  'status',
  'actions'
];
dataSource = new MatTableDataSource<Department>();

  constructor(private httpService:HttpService){}

  ngOnInit(): void {
     this.loadDepartment();
  }

  loadDepartment():void{
    this.httpService.getAllDepartments().subscribe({
      next:(res)=>{
        this.dataSource.data = res;
      }
    })
  }


  openDialog() {
      const dialogRef = this.dialog.open(AddUpdateDepartment, {
        width: '600px',
        height:"280px",
        disableClose: true,
        data: { title: "Add Department", isNew:true}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        
        if (result) {
          switch (result.action) {
            case 'SAVE':
              this.loadDepartment();
              break;
  
            case 'DELETE':
              this.loadDepartment();
              break;
  
            case 'CANCEL':
              break;
          }
        }
      });
    }
  

  editDepartment(department:Department):void{

    const dialogRef = this.dialog.open(AddUpdateDepartment, {
       width: '600px',
        height:"280px",
        disableClose: true,
        data: { title: "Update Department", isNew:false, dept:department}
    });
  
      dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        switch (result.action) {
          case 'SAVE':
            this.loadDepartment();
            break;
  
          case 'DELETE':
            this.loadDepartment();
            break;
  
          case 'CANCEL':
            break;
        }
      }
    });
  }


  deleteDepartment(department:Department):void{

    this.httpService.deleteDepartment(department.id).subscribe({
      next:()=>{
        this.loadDepartment();
      }
    })

  }


}
