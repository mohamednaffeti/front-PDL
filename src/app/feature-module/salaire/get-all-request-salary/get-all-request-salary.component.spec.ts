import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllRequestSalaryComponent } from './get-all-request-salary.component';

describe('GetAllRequestSalaryComponent', () => {
  let component: GetAllRequestSalaryComponent;
  let fixture: ComponentFixture<GetAllRequestSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllRequestSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllRequestSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
