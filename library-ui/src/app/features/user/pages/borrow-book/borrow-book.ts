import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../../../services/httpservice';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BorrowStatus } from '../../../../models/borrowed.interface';

@Component({
  selector: 'app-borrow-book',
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatButtonModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule
  ],
  templateUrl: './borrow-book.html',
  styleUrl: './borrow-book.css',
  providers:[provideNativeDateAdapter()]
})
export class BorrowBook {
   borrowForm: FormGroup;
   deptStatus = ["ACTIVE", "INACTIVE",];
   data = inject(MAT_DIALOG_DATA);

   constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<BorrowBook>,
    private httpService: HttpService
  ){
    this.borrowForm = this.fb.group({
        quantity:['', Validators.required],
        range: this.fb.group({
        start: [null, Validators.required],
        end: [null, Validators.required]
      })
    })
   }


  onSubmit(): void {
    if (this.borrowForm.invalid) {
      this.borrowForm.markAllAsTouched();
      return;
    }

    const payload = {
      bookId: this.data.book.id,
      quantity: this.borrowForm.value.quantity,
      status: BorrowStatus.REQUESTED,
      borrowDate: this.borrowForm.value.range.start
        ?.toISOString()
        ?.split('T')[0],

      returnDate: this.borrowForm.value.range.end
        ?.toISOString()
        ?.split('T')[0]

    }

    console.log(payload);

    this.httpService.createBrrowed(payload).subscribe({
        next:(dept)=>{
            this.dialogRef.close({
                action: 'SAVE',
                data: dept
            });
        }
      });
  }

  get f() {
    return this.borrowForm.controls;
  }

 cancel() {
  this.dialogRef.close({
    action: 'CANCEL'
  });
}
}
