import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBorrowed } from './add-update-borrowed';

describe('AddUpdateBorrowed', () => {
  let component: AddUpdateBorrowed;
  let fixture: ComponentFixture<AddUpdateBorrowed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateBorrowed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateBorrowed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
