import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Agent, Task } from './AgentTask';

@Injectable({
  providedIn: 'root'
})
export class AgentManagerService {
  private agents: Agent[] = [];
  private agentSubject = new Subject<Agent>();

  constructor() { }

  addAgent(newAgent: Agent): void {
    this.agents = [...this.agents, newAgent];
    this.agentSubject.next(newAgent);
  }

  getAgents(): Agent[] {
    return JSON.parse(JSON.stringify(this.agents));
  }

  startAgent(agentId: number): void {
    const selectedAgent = this.agents.find(agent => agent.id === agentId);
    if (selectedAgent) {
      selectedAgent.startAgent();
    }
  }

  stopAgent(agentId: number): void {
    const selectedAgent = this.agents.find(agent => agent.id === agentId);
    if (selectedAgent) {
      selectedAgent.stopAgent();
    }
  }

  newAgentObservable(): Observable<Agent> {
    return this.agentSubject.asObservable();
  }
}
