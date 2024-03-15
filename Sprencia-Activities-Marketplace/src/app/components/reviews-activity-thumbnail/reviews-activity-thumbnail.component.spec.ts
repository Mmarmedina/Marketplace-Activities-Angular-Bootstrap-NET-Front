import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsActivityThumbnailComponent } from './reviews-activity-thumbnail.component';

describe('ReviewsActivityThumbnailComponent', () => {
  let component: ReviewsActivityThumbnailComponent;
  let fixture: ComponentFixture<ReviewsActivityThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsActivityThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsActivityThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
