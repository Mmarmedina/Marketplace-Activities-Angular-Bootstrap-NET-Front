import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationActivitiesComponent } from './pagination-activities.component';

describe('PaginationActivitiesComponent', () => {
  let component: PaginationActivitiesComponent;
  let fixture: ComponentFixture<PaginationActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
