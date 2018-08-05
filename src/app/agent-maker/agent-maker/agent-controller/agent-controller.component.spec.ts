import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentControllerComponent } from './agent-controller.component';

describe('AgentControllerComponent', () => {
  let component: AgentControllerComponent;
  let fixture: ComponentFixture<AgentControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
