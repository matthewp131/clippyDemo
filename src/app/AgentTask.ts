export class Agent {
    private static idCounter = 0;
    private name: string;
    private tasks: Task[];
    private id: number;
    private agentObject: any;

    constructor(name: string) {
        this.name = name;
        this.tasks = new Array<Task>();
        this.id = Agent.idCounter;
        Agent.idCounter++;
    }

    public addTask(newTask: Task): number {
        return this.tasks.push(newTask);
    }

    public startAgent() {

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

    constructor(action: string, params?: any) {
        if (!Task.validActions.includes(action)) {
            throw new Error('Attempted to create new Task with invalid action');
        }

        this.action = action;
        switch (this.action) {
            case 'show':
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
}
