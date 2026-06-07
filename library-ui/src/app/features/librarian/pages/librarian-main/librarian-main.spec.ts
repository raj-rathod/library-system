import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianMain } from './librarian-main';

describe('LibrarianMain', () => {
  let component: LibrarianMain;
  let fixture: ComponentFixture<LibrarianMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarianMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarianMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
