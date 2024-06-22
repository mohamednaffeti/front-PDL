import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesContentComponent } from './absences-content.component';

describe('AbsencesContentComponent', () => {
  let component: AbsencesContentComponent;
  let fixture: ComponentFixture<AbsencesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsencesContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsencesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
