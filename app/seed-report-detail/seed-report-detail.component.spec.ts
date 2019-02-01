import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedReportDetailComponent } from './seed-report-detail.component';

describe('SeedReportDetailComponent', () => {
  let component: SeedReportDetailComponent;
  let fixture: ComponentFixture<SeedReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
