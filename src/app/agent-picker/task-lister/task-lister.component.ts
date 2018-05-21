import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Task, Coordinates } from '../../AgentTask';

@Component({
  selector: 'app-task-lister',
  templateUrl: './task-lister.component.html',
  styleUrls: ['./task-lister.component.css']
})
export class TaskListerComponent {
  @Input() tasks: Task[];
  @Output() taskDeleter = new EventEmitter<number>();

  deleterForm: FormGroup;

  private selectedTaskIndex: number;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  onSubmit(): void {
    this.deleteSelectedTask();
    this.deleterForm.reset();
  }

  taskToString(index: number, task: Task): string {
    return `${index + 1}. ${Task.stringify(task)}`;
  }

  private deleteSelectedTask(): void {
    this.taskDeleter.emit(this.deleterForm.get('taskIndex').value);
  }

  private createForm(): void {
    this.deleterForm = this.formBuilder.group({
      taskIndex: new FormControl(null, Validators.required)
    });
  }
}
