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
    this.tasks = new Array < Task > ();
    this.id = Agent.idCounter;
    Agent.idCounter++;

    this.agentToObservable = bindCallback(clippyjs.load);
    this.agentLoader = this.agentToObservable(this.name);
    this.agentLoader.subscribe((agent) => {
      this.agentObject = agent;
    });
  }

  public addTask(action: string, params?: any): void {
    const newTask = new Task(action, params);
    this.tasks = [...this.tasks, newTask];
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

  public getName(): string {
    return this.name;
  }

  public setName(newName: string): string {
    this.name = newName;
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
    if (action === 'speak') {
      this.action = action;
      this.message = params;
    }
  }

  public static runTask(agent: any, task: Task) {
    if (task.action === 'speak') {
      agent.speak(task.message);
    }
  }

  public getValidActions(): string[] {
    return Task.validActions;
  }
}

export class Coordinates {
  X_px: number;
  Y_px: number;
}
