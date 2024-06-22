import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesContentComponent } from './taches-content.component';

describe('TachesContentComponent', () => {
  let component: TachesContentComponent;
  let fixture: ComponentFixture<TachesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TachesContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TachesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
