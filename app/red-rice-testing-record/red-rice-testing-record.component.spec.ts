import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedRiceTestingRecordComponent } from './red-rice-testing-record.component';

describe('RedRiceTestingRecordComponent', () => {
  let component: RedRiceTestingRecordComponent;
  let fixture: ComponentFixture<RedRiceTestingRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedRiceTestingRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedRiceTestingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
