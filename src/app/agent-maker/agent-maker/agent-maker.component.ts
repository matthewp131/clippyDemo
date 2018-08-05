import { Component, OnInit } from '@angular/core';
import { bindCallback } from 'rxjs';
import clippyjs from 'clippyjs';
import { Agent } from './AgentTask';
import { AgentManagerService } from './agent-manager.service';

@Component({
  selector: 'app-agent-maker',
  templateUrl: './agent-maker.component.html',
  styleUrls: ['./agent-maker.component.css'],
  providers: [AgentManagerService]
})
export class AgentMakerComponent implements OnInit {
  clippyToObservable: any;
  clippyLoader: any;
  currentAgent: Agent;

  public constructor(private agentManagerService: AgentManagerService) {
    this.clippyToObservable = bindCallback(clippyjs.load);
  }

  public ngOnInit() {
    this.clippyLoader = this.clippyToObservable('Clippy');
    this.clippyLoader.subscribe((agent) => {
      agent.show();
      agent.speak('Hello, and welcome to Angular Clippy!');
    });
  }

  public onAgentEmit(agent: Agent) {
    this.currentAgent = agent;
    this.currentAgent.startAgent();
    this.agentManagerService.addAgent(agent);
  }
}
