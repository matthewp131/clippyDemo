import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListerComponent } from './task-lister.component';

describe('TaskListerComponent', () => {
  let component: TaskListerComponent;
  let fixture: ComponentFixture<TaskListerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
