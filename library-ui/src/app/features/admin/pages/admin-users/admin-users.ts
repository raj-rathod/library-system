import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../../services/httpservice';
import { User } from '../../../../models/user.interface';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-admin-users',
  standalone:true,
  imports: [MatTableModule, MatSortModule, MatButton, MatIcon, MatMenuModule,],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers implements OnInit {
 
  users: User[] = [];

  readonly dialog = inject(MatDialog);

  displayedColumns = ['id', 'name', 'email', 'role', 'actions'];

  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
   this.loadUsers();
 
  }


  loadUsers():void {
    this.httpService.getAllUser().subscribe({
      next: (res: User[]) => {

        this.users = res;

        this.dataSource.data = res;

        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddUpdateUserDialog, {
      width: '600px',
      height:"350px",
      disableClose: true,
      data: { title: "Add User", isNew:true}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        switch (result.action) {
          case 'SAVE':
            this.loadUsers();
            break;

          case 'DELETE':
            this.loadUsers();
            break;

          case 'CANCEL':
            break;
        }
      }
    });
  }


  editUser(user: User): void {
  const dialogRef = this.dialog.open(AddUpdateUserDialog, {
     width: '600px',
      height:"350px",
      disableClose: true,
      data: { title: "Update User", isNew:false, user:user}
  });

    dialogRef.afterClosed().subscribe(result => {
    
    if (result) {
      switch (result.action) {
        case 'SAVE':
          this.loadUsers();
          break;

        case 'DELETE':
          this.loadUsers();
          break;

        case 'CANCEL':
          break;
      }
    }
  });
}

deleteUser(user: User): void {
  if (!confirm(`Delete ${user.name}?`)) {
    return;
  }

  this.httpService.deleteUser(user.id).subscribe(() => {
    this.loadUsers();
  });
}



}

@Component({
  selector: 'add-update-user-dialog',
  templateUrl: 'add-update-user-dialog.html',
  imports: [MatDialogTitle, 
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUpdateUserDialog  implements OnInit{
   userForm: FormGroup;
   roles = ["ADMIN", "USER","LIBRARIAN"];
   data = inject(MAT_DIALOG_DATA);

   constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<AddUpdateUserDialog>,
    private httpService: HttpService
  ){
    this.userForm = this.fb.group({
        name:['', Validators.required],
        email:['', [Validators.required, Validators.email]],
        password:['',[Validators.required, Validators.minLength(6)]],
        role:['', Validators.required]
    })
   }

  ngOnInit(): void {
    if(!this.data.isNew){
      this.userForm.patchValue({
        name: this.data.user.name,
        email: this.data.user.email,
        role: this.data.user.role,
      })
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if(this.data.isNew){
         this.httpService.createUser(this.userForm.value).subscribe({
          next:(user)=>{
              this.dialogRef.close({
                  action: 'SAVE',
                  data: user
              });
          }
        });
    } else{
      this.httpService.updateUser(this.data.user.id, this.userForm.value).subscribe({
        next:(user)=>{
              this.dialogRef.close({
                  action: 'SAVE',
                  data: user
              });
          }
      })
    }
   
    

  }

  get f() {
    return this.userForm.controls;
  }

 cancel() {
  this.dialogRef.close({
    action: 'CANCEL'
  });
}

}
