import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSalaireComponent } from './all-salaire.component';

describe('AllSalaireComponent', () => {
  let component: AllSalaireComponent;
  let fixture: ComponentFixture<AllSalaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSalaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
