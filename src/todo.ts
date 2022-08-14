// requires (1) TODO Class (2) TODO list class

// TODO CLASS to implement:
// attributes:
// (1) ID
// (2) Name
// (3) Status - in progress, complete
// (4) todo by date
// (5) importance

// methods:
// (1) getters - i.e. get task info for rendering
// (2) marked as completed
// (3) edit name and date

// TODO LIST CLASS to implment:
// attributes:
// (1) tasks array (each element is an instance of TODO)

// methods:
// (1) get tasks  (by id)
// (2) sort tasks by remaining days or importance
// (3) delete task


//consider getters setters in the todo list class instead of todo item?

import {createTaskElem, appendTaskDiv, addListener} from "./test";


export enum Status {
    Complete = "Complete",
    InProgress = "InProgress"
}

export enum Importance {
    High = "High",
    Medium = "Medium",
    Low = "Low"
}

export enum TaskAttribute {
    Date = "date",
    Importance = "importance",
    Name = "name",

}

export class Todo {
    constructor(private id: number, public name: string, public status: string, public todoDate: string, 
        public importance: string, public completeListener: EventListener = undefined,
        public editListener: EventListener = undefined, public deleteListener: EventListener = undefined) {
            this.id = id;
            this.name = name;
            this.status = status;
            this.todoDate = todoDate;
            this.importance = importance;
            this.completeListener = completeListener;
            this.editListener = editListener;
            this.deleteListener = deleteListener;
            
    }

    getTask(): object {
        return {name: this.name, 
                status: this.status, 
                todo_date: this.todoDate,
                importance: this.importance}
    }

    getTaskId(): number {
        return this.id;
    }

    markedCompleted(): void {
        this.status = Status.Complete;
    }

    setName(newName: string): void {
        this.name = newName
    }

    setDate(newDate: string): void {
        this.todoDate = newDate;
    }

    setImportance(importance: string): void {

        const importanceVal : string = Importance[importance] !== undefined ? Importance[importance]: Importance.Medium
        this.importance = importanceVal
    }

    createElement(): HTMLElement {
        const elem = createTaskElem(this.getTaskId(), this.name);
        return elem;
    }
}

export class TodoList<T extends Todo> {
    private tasksMap: Map<number, T>;
    public listElement: HTMLElement;
    public todoElements: HTMLElement[];

    constructor(tasks: T[], listElement: HTMLElement) {
        this.tasksMap = new Map();
        this.listElement = listElement;
        this.todoElements = [];
        tasks.forEach(task => this.tasksMap.set(task.getTaskId(), task));

    }

    getList(): Todo[] {
        return [...this.tasksMap.values()];
    }

    getTaskById(id: number): Todo {
        return this.tasksMap.get(id);
    }

    taskCompleted(id: number): void {
        this.tasksMap.get(id).markedCompleted();
    }

    changeTaskAttribute(id: number, attribute: string, param: string): void {
        switch(attribute) {
            case TaskAttribute.Date:
                this.tasksMap.get(id).setDate(param);
                break;
            case TaskAttribute.Importance:
                this.tasksMap.get(id).setImportance(param);
                break;
            case TaskAttribute.Name:
                this.tasksMap.get(id).setName(param);
                break;}
    }

    countRemainingTasks(): number {
        return [...this.tasksMap.values()]
               .filter(task => task.status !== "Complete")
               .length;           
    }

    createTaskElements(): HTMLElement {
        [...this.tasksMap.values()].forEach(itm => {
            const elem: HTMLElement = itm.createElement();
            appendTaskDiv(this.listElement, elem);
            this.todoElements.push(elem)
        })
        return;
    }

    addEventListeners(): EventListener {
        
        this.todoElements.forEach(e => {
            console.log(e)
            addListener(e);
        })
        return;
    }

}