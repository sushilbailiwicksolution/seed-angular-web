import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoistureTestingRecordComponent } from './moisture-testing-record.component';

describe('MoistureTestingRecordComponent', () => {
  let component: MoistureTestingRecordComponent;
  let fixture: ComponentFixture<MoistureTestingRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoistureTestingRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoistureTestingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
