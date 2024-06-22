import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestSalaryComponent } from './add-request-salary.component';

describe('AddRequestSalaryComponent', () => {
  let component: AddRequestSalaryComponent;
  let fixture: ComponentFixture<AddRequestSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRequestSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRequestSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
