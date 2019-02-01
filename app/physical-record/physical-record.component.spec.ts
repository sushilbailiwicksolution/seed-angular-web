import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalRecordComponent } from './physical-record.component';

describe('PhysicalRecordComponent', () => {
  let component: PhysicalRecordComponent;
  let fixture: ComponentFixture<PhysicalRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
