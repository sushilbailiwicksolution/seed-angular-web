import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedRiceRecordComponent } from './red-rice-record.component';

describe('RedRiceRecordComponent', () => {
  let component: RedRiceRecordComponent;
  let fixture: ComponentFixture<RedRiceRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedRiceRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedRiceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
