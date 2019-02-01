import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalPurityRecordComponent } from './physical-purity-record.component';

describe('PhysicalPurityRecordComponent', () => {
  let component: PhysicalPurityRecordComponent;
  let fixture: ComponentFixture<PhysicalPurityRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalPurityRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalPurityRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
