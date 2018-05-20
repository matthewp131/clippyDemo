import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task, Coordinates } from '../../AgentTask';

@Component({
  selector: 'app-task-lister',
  templateUrl: './task-lister.component.html',
  styleUrls: ['./task-lister.component.css']
})
export class TaskListerComponent  {
  @Input() tasks: Task[];
  @Output() taskDeleter = new EventEmitter<number>();

  constructor() { }

}
