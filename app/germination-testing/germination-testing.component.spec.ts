import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerminationTestingComponent } from './germination-testing.component';

describe('GerminationTestingComponent', () => {
  let component: GerminationTestingComponent;
  let fixture: ComponentFixture<GerminationTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerminationTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerminationTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
