import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRegistrationFormComponent } from './sample-registration-form.component';

describe('SampleRegistrationFormComponent', () => {
  let component: SampleRegistrationFormComponent;
  let fixture: ComponentFixture<SampleRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
