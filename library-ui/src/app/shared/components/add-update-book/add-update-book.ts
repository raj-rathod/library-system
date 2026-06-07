import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpService } from '../../../services/httpservice';
import { Department } from '../../../models/department.interfcae';

@Component({
  selector: 'app-add-update-book',
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatButtonModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule
  ],
  templateUrl: './add-update-book.html',
  styleUrl: './add-update-book.css',
})
export class AddUpdateBook {
   departments = signal<Department[]>([]);
   bookForm: FormGroup;
   bookStatus = ["AVAILABLE", "UNAVAILABLE", "ARCHIVED"];
   data = inject(MAT_DIALOG_DATA);

   constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<AddUpdateBook>,
    private httpService: HttpService
  ){
    this.bookForm = this.fb.group({
        title:['', Validators.required],
        author:['', Validators.required],
        isbn:['', Validators.required],
        quantity:['', Validators.required],
        departmentId:['', Validators.required],
        status:['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.loadDepartment();
    if(!this.data.isNew){
      this.bookForm.patchValue({
        title: this.data.book.title,
        author: this.data.book.author,
        isbn: this.data.book.isbn,
        quantity:this.data.book.quantity,
        departmentId: this.data.book.departmentId,
        status: this.data.book.status,
      })
    }
  }

  loadDepartment():void{
    this.httpService.getAllDepartments().subscribe({
      next:(res)=>{
        this.departments.set(res);
      }
    })
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }
    if(this.data.isNew){
         this.httpService.createBook(this.bookForm.value).subscribe({
          next:(dept)=>{
              this.dialogRef.close({
                  action: 'SAVE',
                  data: dept
              });
          }
        });
    } else{
      this.httpService.updateBook(this.data.book.id, this.bookForm.value).subscribe({
        next:(dept)=>{
              this.dialogRef.close({
                  action: 'SAVE',
                  data: dept
              });
          }
      })
    }
   
    

  }

  get f() {
    return this.bookForm.controls;
  }

 cancel() {
  this.dialogRef.close({
    action: 'CANCEL'
  });
}

}
