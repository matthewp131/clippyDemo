import { Component, OnInit, OnChanges, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import clippyjs from 'clippyjs';
import { NullTemplateVisitor } from '@angular/compiler';

import { Agent, Task, Coordinates } from '../../AgentTask';

@Component({
  selector: 'app-task-picker',
  templateUrl: './task-picker.component.html',
  styleUrls: ['./task-picker.component.css']
})
export class TaskPickerComponent implements OnInit, OnChanges {
  @Input() agentName: string;
  @Output() taskEmitter = new EventEmitter<Task>();

  taskForm: FormGroup;

  agentActions: string[];
  agentAnimations: string[];

  constructor(private formBuilder: FormBuilder) {
    const actionMap: Map<string, string> = Task.getValidActions();
    this.agentActions = [actionMap.get('speak'), actionMap.get('moveTo'), actionMap.get('gestureAt'), actionMap.get('play')];
    this.createForm();
   }

  ngOnInit() {
    this.onChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.taskForm.get('agentAnimation').reset();
    if (changes.agentName.currentValue) {
        clippyjs.load(changes.agentName.currentValue, (agent) => {
        this.agentAnimations = agent.animations().sort();
      });
    }
  }

  onSubmit() {
    const newTask: Task = this.processAction();
    this.taskEmitter.emit(newTask);
    this.rebuildForm();
  }

  private createForm() {
    this.taskForm = this.formBuilder.group({
      agentAction: new FormControl('', Validators.required),
      agentMessage: new FormControl(),
      agentAnimation: new FormControl(),
      agentGestureXY: this.formBuilder.group({
        X_px: new FormControl(500),
        Y_px: new FormControl(500)
      }),
      agentDestinationXY: this.formBuilder.group({
        X_px: new FormControl(500),
        Y_px: new FormControl(500)
      })
    });
  }

  private rebuildForm() {
    this.taskForm.reset({
      agentGestureXY: {
        X_px: 500,
        Y_px: 500
      },
      agentDestinationXY: {
        X_px: 500,
        Y_px: 500
      }
    });
  }

  private onChanges() {
    this.taskForm.get('agentAction').valueChanges.subscribe(newAction => {
      if (newAction === 'Play Animation') {
        this.taskForm.get('agentAnimation').setValidators(Validators.required);
      } else {
        this.taskForm.get('agentAnimation').setValidators(null);
      }
    });
  }

  private processAction(): Task {
    let newTask: Task;

    switch (this.taskForm.get('agentAction').value) {
      case 'Message':
        newTask = new Task('speak', this.taskForm.get('agentMessage').value);
        break;
      case 'Move To Location':
        const moveXY = new Coordinates(this.taskForm.get('agentDestinationXY').value.X_px,
          this.taskForm.get('agentDestinationXY').value.Y_px);
        newTask = new Task('moveTo', moveXY);
        break;
      case 'Gesture At Location':
        const gestureXY = new Coordinates(this.taskForm.get('agentGestureXY').value.X_px,
          this.taskForm.get('agentGestureXY').value.Y_px);
        newTask = new Task('gestureAt', gestureXY);
        break;
      case 'Play Animation':
        newTask = new Task('play', this.taskForm.get('agentAnimation').value);
        break;
    }

    return newTask;
  }

}
