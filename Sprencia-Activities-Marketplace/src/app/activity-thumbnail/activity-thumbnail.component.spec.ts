import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityThumbnailComponent } from './activity-thumbnail.component';

describe('ActivityThumbnailComponent', () => {
  let component: ActivityThumbnailComponent;
  let fixture: ComponentFixture<ActivityThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
