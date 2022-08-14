export declare enum Status {
    Complete = "Complete",
    InProgress = "InProgress"
}
export declare enum Importance {
    High = "High",
    Medium = "Medium",
    Low = "Low"
}
export declare enum TaskAttribute {
    Date = "date",
    Importance = "importance",
    Name = "name"
}
export declare class Todo {
    private id;
    name: string;
    status: string;
    todoDate: string;
    importance: string;
    constructor(id: number, name: string, status: string, todoDate: string, importance: string);
    getTask(): object;
    getTaskId(): number;
    markedCompleted(): void;
    setName(newName: string): void;
    setDate(newDate: string): void;
    setImportance(importance: string): void;
}
export declare class TodoList<T extends Todo> {
    private tasksMap;
    constructor(tasks: T[]);
    getList(): Todo[];
    getTaskById(id: number): Todo;
    taskCompleted(id: number): void;
    changeTaskAttribute(id: number, attribute: string, param: string): void;
    countRemainingTasks(): number;
}
