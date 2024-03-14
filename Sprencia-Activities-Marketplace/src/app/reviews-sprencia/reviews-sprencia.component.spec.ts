import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsSprenciaComponent } from './reviews-sprencia.component';

describe('ReviewsSprenciaComponent', () => {
  let component: ReviewsSprenciaComponent;
  let fixture: ComponentFixture<ReviewsSprenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsSprenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsSprenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
