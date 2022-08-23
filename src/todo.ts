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


//bugs 
//(1) sort not really working - should be done on basis of remaining days
//(2) todos remaining needs to be updated whenever a single task is created

//todos
//(1) add importance to app and color
//(2) tool tips on each div

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

function* returnID(index: number = 0) {
    let idx = index;
    while(true) {
        yield idx++;
    }
}

function maxID(todos: Object[]): number {
    let _max = 0;
    for(let i of todos) {
        if(i["id"] > _max) {
            _max = i["id"]
        }
    }
    return _max;
}

function setLocalStorage(todos: Todo[]): void {
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getLocalStorage(): Object[] {
    return JSON.parse(localStorage.getItem("todos"));
}

function todosFromLocalStorage(): Todo[] | null {
    console.log("LOCAL TODOS")
    let localTodos = getLocalStorage();

    if (localTodos) {
        let todoArray = [];

        localTodos.forEach(itm => {
            todoArray.push(new Todo(itm["id"], itm["name"], itm["status"], 
                                        itm["todoDate"], itm["importance"]))
        })
        return todoArray;
    }    
    return null;
}


enum RenderStatus {
    All = "All",
    InProgress = "InProgress",
    Complete = "Complete",
    Sorted = "Sorted"
}

export class TodoList<T extends Todo> {
    private tasksMap: Map<number, Todo>;
    public listElement: any;
    public todoElements: HTMLElement[];
    public addTaskButton: HTMLButtonElement;
    public todoBtn: HTMLButtonElement;
    public doneBtn: HTMLButtonElement;
    public allBtn: HTMLButtonElement;
    public sortBtn: HTMLButtonElement;
    public remainingTodos: HTMLParagraphElement;
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
        this.sortBtn = document.querySelector(".add-task-sort")
        this.remainingTodos = document.querySelector(".remaining-tasks")
        this.addTasksFromLocal()


        this.addTaskButton.addEventListener("click", ()=> {
            const taskName: HTMLInputElement = document.querySelector(".add-task-input")
            const taskDate: HTMLInputElement  = document.querySelector(".add-task-date")
            console.log({name: taskName.value, date: taskDate.value})
            const id = this.addTask(taskName.value, taskDate.value);
            this.createTaskElement(id);
            this.addEventListenersToElem(this.todoElements[this.todoElements.length-1].getAttribute("class").split("-")[1]);
            this.setTasksInLocalStorage();
        })


        //refactor colour changes too messy
        this.todoBtn.addEventListener("click", ()=> {
            console.log("todo");
            this.renderfiltered("InProgress");
            
            this.todoBtn.style.backgroundColor = "white";
            this.todoBtn.style.color = "black";

            this.doneBtn.style.backgroundColor = "black";
            this.doneBtn.style.color = "white";

            this.allBtn.style.backgroundColor = "black";
            this.allBtn.style.color = "white";

            this.sortBtn.style.backgroundColor = "black";
            this.sortBtn.style.color = "white";
            
        })

        this.doneBtn.addEventListener("click", ()=> {
            console.log("todo");
            this.renderfiltered("Complete");

            this.todoBtn.style.backgroundColor = "black";
            this.todoBtn.style.color = "white";

            this.doneBtn.style.backgroundColor = "white";
            this.doneBtn.style.color = "black";

            this.allBtn.style.backgroundColor = "black";
            this.allBtn.style.color = "white"
            
            this.sortBtn.style.backgroundColor = "black";
            this.sortBtn.style.color = "white";
        })

        this.allBtn.addEventListener("click", ()=> {
            console.log("All");
            this.renderfiltered("All");

            this.todoBtn.style.backgroundColor = "black";
            this.todoBtn.style.color = "white";

            this.doneBtn.style.backgroundColor = "black";
            this.doneBtn.style.color = "white";

            this.allBtn.style.backgroundColor = "white";
            this.allBtn.style.color = "black"

            this.sortBtn.style.backgroundColor = "black";
            this.sortBtn.style.color = "white";
            
        })
        this.sortBtn.addEventListener("click", ()=> {
            console.log("sort");
            this.renderfiltered("Sorted");

            this.todoBtn.style.backgroundColor = "black";
            this.todoBtn.style.color = "white";

            this.doneBtn.style.backgroundColor = "black";
            this.doneBtn.style.color = "white";

            this.allBtn.style.backgroundColor = "black";
            this.allBtn.style.color = "white"

            this.sortBtn.style.backgroundColor = "white";
            this.sortBtn.style.color = "black";
            
            // this.setTasksInLocalStorage()
        })
    }

    setTasksInLocalStorage(): void {
        setLocalStorage([...this.tasksMap.values()])
    }

    addTask(taskName: string, taskDate: string): number {
        const taskId = this.id.next().value
        let task: Todo = new Todo(taskId, taskName, "InProgress", taskDate, "high");
        this.tasksMap.set(taskId, task);
        console.log(this.tasksMap);
        this.setRemainingTasks();
        return taskId;
    }

    setRemainingTasks(): HTMLElement {
        const remainingTodos = this.countRemainingTasks() | 0;
        this.remainingTodos.textContent = `${remainingTodos} todos remaining`;
        return;
    }

    addTasksFromLocal(): HTMLAllCollection {
        let todos: Todo[] = todosFromLocalStorage();
        this.id = todos !== null ? returnID(maxID(todos)+1) : returnID(); 
        
        todos.forEach(todo => {
            const taskId: number = todo["id"];
            this.tasksMap.set(taskId, todo);
        })
        this.createTaskElements();
        this.addEventListenersToAllElems();
        this.setRemainingTasks();
        return;
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

    sortByDate(): Todo[] {
            let taskArray: Todo[] = [...this.tasksMap.values()] 
            console.log("before")
            console.log(taskArray);
            taskArray.sort((a, b) => {
                return new Date(a.todoDate).valueOf() -  new Date(b.todoDate).valueOf()
               })
            console.log("after")
            console.log(taskArray);
            return taskArray;
    }
    
    renderfiltered(status: string): HTMLElement {
        // let filtered = status === RenderStatus.All ? [...this.tasksMap.values()] : this.filterStatus(status)
        console.log(`STATUS: ${status}`)
        let filtered = status === RenderStatus.All ? [...this.tasksMap.values()] :
                       status === RenderStatus.Sorted ? this.sortByDate()
                       : this.filterStatus(status)
        
        console.log(filtered);
        // let filteredElems: HTMLElement[] = []
        this.todoElements = [];

        filtered.forEach(task => {
            const elem: HTMLElement = task.createElement();
            
            this.todoElements.push(elem);
        })


        this.listElement.replaceChildren(...this.todoElements);
        this.addEventListenersToAllElems();
        this.markCompleted(filtered);

        return;
    }

    markCompleted(filtered: Todo[]): HTMLElement {
        filtered.forEach(itm => {
            if(itm.status === RenderStatus.Complete) {
                const elemName: HTMLElement = document.querySelector(`.todo-name-${itm.getTaskId()}`);
                elemName.style.textDecorationLine = 'line-through';
            }
        })
        return;
    }

    createTaskElements(): HTMLElement {
        
        [...this.tasksMap.values()].forEach(itm => {
            const elem: HTMLElement = itm.createElement();
            appendTaskDiv(this.listElement, elem);
            const elemName: HTMLElement = document.querySelector(`.todo-name-${itm.getTaskId()}`);
            if(itm.status === RenderStatus.Complete) {
                elemName.style.textDecorationLine = 'line-through';
            }
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

    addEventListenersToAllElems(): EventListener {
        console.log(this.todoElements)

        this.todoElements.forEach(itm => {
            const elemId: string = itm.getAttribute("class").split("-")[1];
            this.addEventListenersToElem(elemId);    
        })

        return;
    }


    //clean up
    addEventListenersToElem(elemId: string): EventListener {
        
        const completeElem = document.querySelector(`.complete-${elemId}`);
        const editElem = document.querySelector(`.edit-${elemId}`);
        const deleteElem = document.querySelector(`.delete-${elemId}`);

        completeElem.addEventListener("click", ()=> {
            const elem: HTMLElement = document.querySelector(`.todo-name-${elemId}`);
            if(elem.style.textDecorationLine === "none") {
                elem.style.textDecorationLine = 'line-through';
                this.tasksMap.get(Number(elemId)).markedCompleted();
                this.setRemainingTasks();
                this.setTasksInLocalStorage();
                console.log(this.tasksMap.get(Number(elemId)))
            } else {
                elem.style.textDecorationLine = 'none';
                this.tasksMap.get(Number(elemId)).setInProgress();
                this.setRemainingTasks();
                this.setTasksInLocalStorage();
                console.log(this.tasksMap.get(Number(elemId)))
            }
        });
        
        editElem.addEventListener("click", ()=> {
            console.log(`edit-${elemId}`);
        });
        
        deleteElem.addEventListener("click", ()=> {
            const elem: HTMLElement = document.querySelector(`.todo-${elemId}`);
            elem.remove();
            this.tasksMap.delete(Number(elemId));
            this.setRemainingTasks();
            this.setTasksInLocalStorage();
        });
    

        return; 
    }

}