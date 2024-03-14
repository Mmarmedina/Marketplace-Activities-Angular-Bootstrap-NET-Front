import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateActivityComponent } from './form-update-activity.component';

describe('FormUpdateActivityComponent', () => {
  let component: FormUpdateActivityComponent;
  let fixture: ComponentFixture<FormUpdateActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUpdateActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
