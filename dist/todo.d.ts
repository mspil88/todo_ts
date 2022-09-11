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
    completeListener: EventListener;
    editListener: EventListener;
    deleteListener: EventListener;
    constructor(id: number, name: string, status: string, todoDate: string, importance: string, completeListener?: EventListener, editListener?: EventListener, deleteListener?: EventListener);
    getTask(): object;
    getTaskId(): number;
    markedCompleted(): void;
    setInProgress(): void;
    setName(newName: string): void;
    setDate(newDate: string): void;
    setImportance(importance: string): void;
    createElement(): HTMLElement;
}
export declare class TodoList<T extends Todo> {
    private tasksMap;
    listElement: any;
    todoElements: HTMLElement[];
    addTaskButton: HTMLButtonElement;
    todoBtn: HTMLButtonElement;
    doneBtn: HTMLButtonElement;
    allBtn: HTMLButtonElement;
    sortBtn: HTMLButtonElement;
    remainingTodos: HTMLParagraphElement;
    private id;
    constructor(listElement: HTMLElement);
    setTasksInLocalStorage(): void;
    addTask(taskName: string, taskDate: string, importance: string): number;
    setRemainingTasks(): HTMLElement;
    flagHighImportance(filtered: Todo[]): HTMLElement;
    addTasksFromLocal(): HTMLAllCollection;
    getList(): Todo[];
    getTaskById(id: number): Todo;
    taskCompleted(id: number): void;
    changeTaskAttribute(id: number, attribute: string, param: string): void;
    countRemainingTasks(): number;
    filterStatus(status: string): Todo[];
    sortByDate(): Todo[];
    renderfiltered(status: string): HTMLElement;
    markCompleted(filtered: Todo[]): HTMLElement;
    createTaskElements(): HTMLElement;
    createTaskElement(id: number): HTMLElement;
    addEventListeners(): EventListener;
    addEventListenersToAllElems(): EventListener;
    addEventListenersToElem(elemId: string): EventListener;
}
