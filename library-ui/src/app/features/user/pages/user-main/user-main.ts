import { Component } from '@angular/core';
import { Main } from '../../../../layouts/main/main';
import { Menu } from '../../../../models/menu.interface';
import { USER_MENU } from '../../../../utils/constants/menu';

@Component({
  selector: 'app-user-main',
  imports: [Main],
  templateUrl: './user-main.html',
  styleUrl: './user-main.css',
})
export class UserMain {

  menu:Menu[] = USER_MENU

}
