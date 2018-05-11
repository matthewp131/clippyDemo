export class AgentTask {
    name: string;
    action: string;
    animation: string;
    destination: Coordinates;
    gesture: Coordinates;
    message: string;
}

export class Coordinates {
    X_px: number;
    Y_px: number;
}
