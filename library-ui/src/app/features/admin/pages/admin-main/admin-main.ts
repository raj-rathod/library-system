import { Component } from '@angular/core';
import { Main } from '../../../../layouts/main/main';
import { AMDIN_MENU } from '../../../../utils/constants/menu';
import { Menu } from '../../../../models/menu.interface';

@Component({
  selector: 'app-admin-main',
  imports: [Main],
  templateUrl: './admin-main.html',
  styleUrl: './admin-main.css',
})
export class AdminMain {

  menu:Menu[] = AMDIN_MENU;

}
