import { bindCallback } from 'rxjs';
import clippyjs from 'clippyjs';

export class Agent {
  private static idCounter = 0;
  private name: string;
  private tasks: Task[];
  private id: number;
  private agentObject: any;
  private agentToObservable: any;
  private agentLoader: any;

  constructor(name: string) {
    this.name = name;
    this.tasks = new Array <Task> ();
    this.id = Agent.idCounter;
    Agent.idCounter++;

    this.agentToObservable = bindCallback(clippyjs.load);
    this.agentLoader = this.agentToObservable(this.name);
    this.agentLoader.subscribe((agent) => {
      this.agentObject = agent;
    });
  }

  public addTask(task: Task): void {
    this.tasks = [...this.tasks, task];
  }

  public startAgent() {
    this.agentObject.show();

    for (const task of this.tasks) {
      Task.runTask(this.agentObject, task);
    }
  }

  public stopCurrentTask() {
    this.agentObject.stopCurrent();
  }

  public stopAgent() {
    this.agentObject.stop();
  }

  public hideAgent() {
    this.agentObject.hide();
  }

  public getName(): string {
    return this.name;
  }

  public setName(newName: string): string {
    this.name = newName;
    this.agentLoader = this.agentToObservable(this.name);
    this.agentLoader.subscribe((agent) => {
      this.agentObject = agent;
    });
    return this.name;
  }

  public getTasks(): Task[] {
    return this.tasks.map((task: Task) => Object.assign({}, task));
  }

  public getId(): number {
    return this.id;
  }
}

export class Task {
  private static validActions: string[] = ['show', 'hide', 'play', 'animate', 'speak', 'moveTo', 'gestureAt', 'stopCurrent', 'stop'];
  action: string;
  animation: string;
  destination: Coordinates;
  gesture: Coordinates;
  message: string;
  timeoutMs: number;

  constructor(action: string, params?: any) {
    this.action = action;
    switch (this.action) {
      case 'speak':
        this.message = params;
        break;
      case 'moveTo':
        this.destination = params;
        break;
      case 'gestureAt':
        this.gesture = params;
        break;
      case 'play':
        this.animation = params;
        break;
    }
  }

  public static runTask(agent: any, task: Task) {
    switch (task.action) {
      case 'speak':
        agent.speak(task.message);
        break;
      case 'moveTo':
        agent.moveTo(task.destination.X_px, task.destination.Y_px);
        break;
      case 'gestureAt':
        agent.gestureAt(task.gesture.X_px, task.gesture.Y_px);
        break;
      case 'play':
        agent.play(task.animation);
        break;
    }
  }

  public getValidActions(): string[] {
    return Task.validActions;
  }
}

export class Coordinates {
  X_px: number;
  Y_px: number;

  constructor(x: number, y: number) {
    this.X_px = x;
    this.Y_px = y;
  }
}
