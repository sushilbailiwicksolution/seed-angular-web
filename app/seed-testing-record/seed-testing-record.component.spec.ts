import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedTestingRecordComponent } from './seed-testing-record.component';

describe('SeedTestingRecordComponent', () => {
  let component: SeedTestingRecordComponent;
  let fixture: ComponentFixture<SeedTestingRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedTestingRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedTestingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
