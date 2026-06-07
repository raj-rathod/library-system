import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../services/httpservice';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auth',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Auth {

  email = '';
  password = '';

  isLoading = false;
  
  hide = signal(true);

  constructor(
    private httpService:HttpService,
    private router:Router,
  ){}


  clickEvent(event: MouseEvent):void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submit():void{
    if(this.email && this.password){
      this.isLoading = true;
      const req = {
        email: this.email,
        password: this.password
      }
      this.httpService.logingUser(req).subscribe(
          (res) =>{
            this.isLoading = false;
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem("role", res.role);
            localStorage.setItem("refreshToken", res.refreshToken);
            localStorage.setItem("name", res.name);
            this.router.navigate(['']);
          },
          (err)=>{
            this.isLoading = false;
            localStorage.clear();
          }
      );
    }
  }

}
