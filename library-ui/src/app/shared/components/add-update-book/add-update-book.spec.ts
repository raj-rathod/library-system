import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBook } from './add-update-book';

describe('AddUpdateBook', () => {
  let component: AddUpdateBook;
  let fixture: ComponentFixture<AddUpdateBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateBook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
