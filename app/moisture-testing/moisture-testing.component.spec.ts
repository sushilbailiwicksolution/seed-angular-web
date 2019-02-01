import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoistureTestingComponent } from './moisture-testing.component';

describe('MoistureTestingComponent', () => {
  let component: MoistureTestingComponent;
  let fixture: ComponentFixture<MoistureTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoistureTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoistureTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
