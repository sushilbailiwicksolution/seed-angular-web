import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerminationRecordComponent } from './germination-record.component';

describe('GerminationRecordComponent', () => {
  let component: GerminationRecordComponent;
  let fixture: ComponentFixture<GerminationRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerminationRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerminationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
