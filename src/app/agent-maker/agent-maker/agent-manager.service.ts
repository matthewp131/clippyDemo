import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Agent, Task } from './AgentTask';

@Injectable({
  providedIn: 'root'
})
export class AgentManagerService {
  private agents: Agent[];
  private agentSubject = new Subject<Agent>();

  constructor() { }

  addAgent(newAgent: Agent): void {
    this.agents = [...this.agents, newAgent];
  }

  getAgents(): Agent[] {
    return this.agents.slice();
  }

  startAgent(agentId: number): void {
    const selectedAgent = this.agents.find(agent => agent.getId() === agentId);
    if (selectedAgent) {
      selectedAgent.startAgent();
    }
  }

  stopAgent(agentId: number): void {
    const selectedAgent = this.agents.find(agent => agent.getId() === agentId);
    if (selectedAgent) {
      selectedAgent.stopAgent();
    }
  }
}
