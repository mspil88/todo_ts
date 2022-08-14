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

    setInProgress(): void {
        this.status = Status.InProgress;
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

function* returnID() {
    let idx = 0;
    while(true) {
        yield idx++;
    }
}

export class TodoList<T extends Todo> {
    private tasksMap: Map<number, Todo>;
    public listElement: any;
    public todoElements: HTMLElement[];
    public addTaskButton: HTMLButtonElement;
    public todoBtn: HTMLButtonElement;
    public doneBtn: HTMLButtonElement;
    public allBtn: HTMLButtonElement;
    private id;

    constructor(tasks: T[], listElement: HTMLElement) {
        this.tasksMap = new Map();
        this.listElement = listElement;
        this.todoElements = [];
        this.addTaskButton = document.querySelector(".add-task-btn");
        // tasks.forEach(task => this.tasksMap.set(task.getTaskId(), task));
        this.id = returnID();
        this.todoBtn = document.querySelector(".add-task-todo")
        this.doneBtn = document.querySelector(".add-task-done")
        this.allBtn = document.querySelector(".add-task-all")

        this.addTaskButton.addEventListener("click", ()=> {
            const taskName: HTMLInputElement = document.querySelector(".add-task-input")
            const taskDate: HTMLInputElement  = document.querySelector(".add-task-date")
            console.log({name: taskName.value, date: taskDate.value})
            const id = this.addTask(taskName.value, taskDate.value);
            this.createTaskElement(id);
            this.addEventListenersToElem();
        })

        this.todoBtn.addEventListener("click", ()=> {
            console.log("todo");
            this.renderfiltered("InProgress")
        })

        this.doneBtn.addEventListener("click", ()=> {
            console.log("todo");
            this.renderfiltered("Complete")
        })

        this.allBtn.addEventListener("click", ()=> {
            console.log("All");
            this.renderfiltered("All")
            
        })
    }

    addTask(taskName: string, taskDate: string): number {
        const taskId = this.id.next().value
        let task: Todo = new Todo(taskId, taskName, "InProgress", taskDate, "high");
        this.tasksMap.set(taskId, task);
        return taskId;
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
        return this.filterStatus("InProgress")
               .length;           
    }

    filterStatus(status: string): Todo[]{
        return [...this.tasksMap.values()]
               .filter(task => task.status === status)
    }

    renderfiltered(status: string): HTMLElement {
        let filtered = status === "All" ? [...this.tasksMap.values()] : this.filterStatus(status)
        let filteredElems: HTMLElement[] = []
        filtered.forEach(task => {
            const elem: HTMLElement = task.createElement();
            filteredElems.push(elem);
        })

        this.listElement.replaceChildren(...filteredElems);
        return;
    }

    createTaskElements(): HTMLElement {
        
        [...this.tasksMap.values()].forEach(itm => {
            const elem: HTMLElement = itm.createElement();
            appendTaskDiv(this.listElement, elem);
            this.todoElements.push(elem)
        })
        return;
    }

    createTaskElement(id: number): HTMLElement {
        const elem: HTMLElement = this.tasksMap.get(id).createElement();
        appendTaskDiv(this.listElement, elem);
        this.todoElements.push(elem)
        return;
    }

    addEventListeners(): EventListener {
        
        this.todoElements.forEach(e => {
            console.log(e)
            addListener(e);
        })
        return;
    }
    //clean up
    addEventListenersToElem(): EventListener {
        
        const elemId: string = this.todoElements[this.todoElements.length-1].getAttribute("class").split("-")[1];
    
        const completeElem = document.querySelector(`.complete-${elemId}`);
        const editElem = document.querySelector(`.edit-${elemId}`);
        const deleteElem = document.querySelector(`.delete-${elemId}`);

        completeElem.addEventListener("click", ()=> {
            const elem: HTMLElement = document.querySelector(`.todo-name-${elemId}`);
            if(elem.style.textDecorationLine === "none") {
                elem.style.textDecorationLine = 'line-through';
                this.tasksMap.get(Number(elemId)).markedCompleted();
                console.log(this.tasksMap.get(Number(elemId)))
            } else {
                elem.style.textDecorationLine = 'none';
                this.tasksMap.get(Number(elemId)).setInProgress();
                console.log(this.tasksMap.get(Number(elemId)))
            }
        });
        
        editElem.addEventListener("click", ()=> {
            console.log(`edit-${elemId}`);
        });
        
        deleteElem.addEventListener("click", ()=> {
            const elem: HTMLElement = document.querySelector(`.todo-${elemId}`);
            elem.remove();
            this.tasksMap.delete(Number(elemId))
        });
    

        return; 
    }

}