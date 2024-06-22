import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsContentComponent } from './teams-content.component';

describe('TeamsContentComponent', () => {
  let component: TeamsContentComponent;
  let fixture: ComponentFixture<TeamsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
