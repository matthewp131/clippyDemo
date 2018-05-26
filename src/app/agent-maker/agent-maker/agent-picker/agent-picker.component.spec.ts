import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPickerComponent } from './agent-picker.component';

describe('AgentPickerComponent', () => {
  let component: AgentPickerComponent;
  let fixture: ComponentFixture<AgentPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
