import { Component, OnInit } from '@angular/core';
import { bindCallback } from 'rxjs';
import clippyjs from 'clippyjs';
import { Agent } from './AgentTask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  clippyToObservable: any;
  clippyLoader: any;
  currentAgent: Agent;

  public constructor() {
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
  }
}
