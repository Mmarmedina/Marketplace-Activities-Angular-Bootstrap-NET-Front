import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewActivityComponent } from './form-new-activity.component';

describe('FormNewActivityComponent', () => {
  let component: FormNewActivityComponent;
  let fixture: ComponentFixture<FormNewActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormNewActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormNewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
