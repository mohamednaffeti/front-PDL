import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRequestComponent } from './doc-request.component';

describe('DocRequestComponent', () => {
  let component: DocRequestComponent;
  let fixture: ComponentFixture<DocRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
