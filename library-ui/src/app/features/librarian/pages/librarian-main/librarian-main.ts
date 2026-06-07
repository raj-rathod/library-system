import { Component } from '@angular/core';
import { Main } from '../../../../layouts/main/main';
import { Menu } from '../../../../models/menu.interface';
import { LIBRARIAN_MENU } from '../../../../utils/constants/menu';

@Component({
  selector: 'app-librarian-main',
  imports: [Main],
  templateUrl: './librarian-main.html',
  styleUrl: './librarian-main.css',
})
export class LibrarianMain {

  menu:Menu[] = LIBRARIAN_MENU;

}
