import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import clippyjs from 'clippyjs';
import { NullTemplateVisitor } from '@angular/compiler';

import { Agent, Task, Coordinates } from '../AgentTask';

@Component({
  selector: 'app-agent-picker',
  templateUrl: './agent-picker.component.html',
  styleUrls: ['./agent-picker.component.css']
})
export class AgentPickerComponent implements OnInit {
  @Output() agentEmitter = new EventEmitter<Agent>();

  agentForm: FormGroup;
  agentNames: string[] = ['Merlin', 'Links', 'Genius', 'Genie', 'Rover', 'Peedy', 'Bonzi', 'Clippy', 'F1', 'Rocky'];
  currentName: string;
  taskList: Task[];
  private currentAgent: Agent;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.onChanges();
  }

  onTaskEmit(task: Task) {
    this.currentAgent.addTask(task);
    this.taskList = this.currentAgent.getTasks();
  }

  onTaskDelete(taskIndex: number) {
    this.currentAgent.deleteTask(taskIndex);
    this.taskList = this.currentAgent.getTasks();
  }

  onSubmit() {
    this.agentEmitter.emit(this.currentAgent);
    this.taskList.length = 0;
    this.currentName = null;
    this.rebuildForm();
  }

  private createForm() {
    this.agentForm = this.formBuilder.group({
      agentName: new FormControl('', Validators.required)
    });
  }

  private rebuildForm() {
    this.agentForm.reset();
  }

  private onChanges() {
    this.agentForm.get('agentName').valueChanges.subscribe(newAgentName => {
      this.currentName = newAgentName;
      this.currentAgent = (this.currentName ? new Agent(this.currentName) : null);
    });
  }
}
