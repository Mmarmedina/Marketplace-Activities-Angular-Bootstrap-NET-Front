import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSprenciaThumbnailComponent } from './review-sprencia-thumbnail.component';

describe('ReviewSprenciaThumbnailComponent', () => {
  let component: ReviewSprenciaThumbnailComponent;
  let fixture: ComponentFixture<ReviewSprenciaThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewSprenciaThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewSprenciaThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
