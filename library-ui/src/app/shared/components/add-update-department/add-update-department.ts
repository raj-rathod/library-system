import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpService } from '../../../services/httpservice';

@Component({
  selector: 'app-add-update-department',
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
  templateUrl: './add-update-department.html',
  styleUrl: './add-update-department.css',
})
export class AddUpdateDepartment {
   deptForm: FormGroup;
   deptStatus = ["ACTIVE", "INACTIVE",];
   data = inject(MAT_DIALOG_DATA);

   constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<AddUpdateDepartment>,
    private httpService: HttpService
  ){
    this.deptForm = this.fb.group({
        name:['', Validators.required],
        status:['', Validators.required]
    })
   }

  ngOnInit(): void {
    if(!this.data.isNew){
      this.deptForm.patchValue({
        name: this.data.dept.name,
        status: this.data.dept.status,
      })
    }
  }

  onSubmit(): void {
    if (this.deptForm.invalid) {
      this.deptForm.markAllAsTouched();
      return;
    }
    if(this.data.isNew){
         this.httpService.createDepartment(this.deptForm.value).subscribe({
          next:(dept)=>{
              this.dialogRef.close({
                  action: 'SAVE',
                  data: dept
              });
          }
        });
    } else{
      this.httpService.updateDeparment(this.data.dept.id, this.deptForm.value).subscribe({
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
    return this.deptForm.controls;
  }

 cancel() {
  this.dialogRef.close({
    action: 'CANCEL'
  });
}

}
