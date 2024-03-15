import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActivityComponent } from './new-activity.component';

describe('NewActivityComponent', () => {
  let component: NewActivityComponent;
  let fixture: ComponentFixture<NewActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
