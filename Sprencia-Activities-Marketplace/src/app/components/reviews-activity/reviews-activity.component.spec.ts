import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsActivityComponent } from './reviews-activity.component';

describe('ReviewsActivityComponent', () => {
  let component: ReviewsActivityComponent;
  let fixture: ComponentFixture<ReviewsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
