import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Menu } from '../../models/menu.interface';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, CommonModule, MatMenuModule, MatButtonModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {

    username = localStorage.getItem("name")
    @Input() menu:Menu[] = [];

    constructor(
      private router: Router,
      private route: ActivatedRoute
    ){}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {

      let page = params['menuIndex'];

      page = parseInt(page) || 0;

      if(page <0 || page > this.menu.length-1){
        page = 0; 
      }
      this.selectedMenu(page);

    });
    }

    selectedMenu(index:number){

      this.router.navigate([this.menu[index].route], { queryParams:{menuIndex:index}});

      this.menu.forEach((menu,i)=>{
        if(i == index){
          menu.isActive = true;
        }else{
          menu.isActive = false;
        }
      })
    }

    logout():void {
      localStorage.clear();
      this.router.navigate(['/auth']);
    }
}
