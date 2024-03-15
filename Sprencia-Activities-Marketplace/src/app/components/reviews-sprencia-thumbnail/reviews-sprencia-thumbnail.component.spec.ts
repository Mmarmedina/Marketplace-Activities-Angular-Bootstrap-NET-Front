import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsSprenciaThumbnailComponent } from './reviews-sprencia-thumbnail.component';

describe('ReviewsSprenciaThumbnailComponent', () => {
  let component: ReviewsSprenciaThumbnailComponent;
  let fixture: ComponentFixture<ReviewsSprenciaThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsSprenciaThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsSprenciaThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
