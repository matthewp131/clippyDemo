import { Component, OnInit } from '@angular/core';
import { AgentManagerService } from '../agent-manager.service';
import { Observable } from 'rxjs';
import { Agent, Task } from '../AgentTask';

@Component({
  selector: 'app-agent-controller',
  templateUrl: './agent-controller.component.html',
  styleUrls: ['./agent-controller.component.css']
})
export class AgentControllerComponent implements OnInit {
  private agentsObservable: Observable<Agent>;

  agentList: Array<Agent>;
  selectedRowIndex = NaN;
  selectedAgent: Agent = null;
  selectedTasks: Array<Task> = null;

  constructor(private agentManagerService: AgentManagerService) { }

  ngOnInit() {
    this.agentsObservable = this.agentManagerService.newAgentObservable();
    this.agentsObservable.subscribe(newAgent => {
      this.agentList = this.agentManagerService.getAgents();
    });
  }

  selectRow(index: number) {
    if (index !== this.selectedRowIndex) {
      this.selectedRowIndex = index;
      this.selectedAgent = this.agentList[this.selectedRowIndex];
      this.selectedTasks = this.selectedAgent.getTasks();
    } else {
      this.selectedRowIndex = NaN;
      this.selectedAgent = null;
      this.selectedTasks = null;
    }
  }

  taskToString(task: Task): string {
    return `${Task.stringify(task)}`;
  }

  respawn() {
    if (this.selectedAgent) {
      this.agentManagerService.startAgent(this.selectedAgent.id);
    }
  }
}
