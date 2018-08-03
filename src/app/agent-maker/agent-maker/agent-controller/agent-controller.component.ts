import { Component, OnInit } from '@angular/core';
import { AgentManagerService } from '../agent-manager.service';
import { Observable } from 'rxjs';
import { Agent } from '../AgentTask';

@Component({
  selector: 'app-agent-controller',
  templateUrl: './agent-controller.component.html',
  styleUrls: ['./agent-controller.component.css']
})
export class AgentControllerComponent implements OnInit {
  private agentsObservable: Observable<Agent>;

  agentList: Array<Agent>;

  constructor(private agentManagerService: AgentManagerService) { }

  ngOnInit() {
    this.agentsObservable = this.agentManagerService.newAgentObservable();
    this.agentsObservable.subscribe(newAgent => {
      this.agentList = this.agentManagerService.getAgents();
      console.log(this.agentList);
    });
  }

}
