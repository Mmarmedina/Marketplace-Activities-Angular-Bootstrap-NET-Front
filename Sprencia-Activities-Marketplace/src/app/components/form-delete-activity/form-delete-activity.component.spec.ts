import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleteActivityComponent } from './form-delete-activity.component';

describe('FormDeleteActivityComponent', () => {
  let component: FormDeleteActivityComponent;
  let fixture: ComponentFixture<FormDeleteActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDeleteActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDeleteActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
