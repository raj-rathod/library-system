import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDepartment } from './add-update-department';

describe('AddUpdateDepartment', () => {
  let component: AddUpdateDepartment;
  let fixture: ComponentFixture<AddUpdateDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateDepartment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
