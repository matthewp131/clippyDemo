import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Agent, Task } from '../AgentTask';

@Component({
  selector: 'app-agent-picker',
  templateUrl: './agent-picker.component.html',
  styleUrls: ['./agent-picker.component.css']
})
export class AgentPickerComponent implements OnInit {
  @Output() agentEmitter = new EventEmitter<Agent>();

  submitSubject = new Subject<any>();
  submitWatcher: Observable<any>;
  currentName: string;
  taskList: Task[] = [];
  currentAgent: Agent;

  constructor() { }

  ngOnInit() {
    this.submitWatcher = this.submitSubject.asObservable();
  }

  onSubmit() {
    this.agentEmitter.emit(this.currentAgent);
    this.taskList.length = 0;
    this.currentName = null;
    this.submitSubject.next();
  }

  onNameEmit(name: string) {
    this.currentName = name;
    this.currentAgent = (this.currentName ? new Agent(this.currentName) : null);
  }

  onTaskEmit(task: Task) {
    this.currentAgent.addTask(task);
    this.taskList = this.currentAgent.getTasks();
  }

  onTaskDelete(taskIndex: number) {
    this.currentAgent.deleteTask(taskIndex);
    this.taskList = this.currentAgent.getTasks();
  }
}
