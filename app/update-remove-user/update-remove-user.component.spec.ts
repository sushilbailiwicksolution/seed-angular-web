import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRemoveUserComponent } from './update-remove-user.component';

describe('UpdateRemoveUserComponent', () => {
  let component: UpdateRemoveUserComponent;
  let fixture: ComponentFixture<UpdateRemoveUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRemoveUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRemoveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
