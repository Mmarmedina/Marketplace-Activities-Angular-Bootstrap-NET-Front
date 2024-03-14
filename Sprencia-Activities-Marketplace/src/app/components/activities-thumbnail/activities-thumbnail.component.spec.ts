import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesThumbnailComponent } from './activities-thumbnail.component';

describe('ActivitiesThumbnailComponent', () => {
  let component: ActivitiesThumbnailComponent;
  let fixture: ComponentFixture<ActivitiesThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivitiesThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitiesThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
