"use strict";
// requires (1) TODO Class (2) TODO list class
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = exports.Todo = exports.TaskAttribute = exports.Importance = exports.Status = void 0;
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
const test_1 = require("./test");
var Status;
(function (Status) {
    Status["Complete"] = "Complete";
    Status["InProgress"] = "InProgress";
})(Status = exports.Status || (exports.Status = {}));
var Importance;
(function (Importance) {
    Importance["High"] = "High";
    Importance["Medium"] = "Medium";
    Importance["Low"] = "Low";
})(Importance = exports.Importance || (exports.Importance = {}));
var TaskAttribute;
(function (TaskAttribute) {
    TaskAttribute["Date"] = "date";
    TaskAttribute["Importance"] = "importance";
    TaskAttribute["Name"] = "name";
})(TaskAttribute = exports.TaskAttribute || (exports.TaskAttribute = {}));
class Todo {
    constructor(id, name, status, todoDate, importance, completeListener = undefined, editListener = undefined, deleteListener = undefined) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.todoDate = todoDate;
        this.importance = importance;
        this.completeListener = completeListener;
        this.editListener = editListener;
        this.deleteListener = deleteListener;
        this.id = id;
        this.name = name;
        this.status = status;
        this.todoDate = todoDate;
        this.importance = importance;
        this.completeListener = completeListener;
        this.editListener = editListener;
        this.deleteListener = deleteListener;
    }
    getTask() {
        return { name: this.name,
            status: this.status,
            todo_date: this.todoDate,
            importance: this.importance };
    }
    getTaskId() {
        return this.id;
    }
    markedCompleted() {
        this.status = Status.Complete;
    }
    setInProgress() {
        this.status = Status.InProgress;
    }
    setName(newName) {
        this.name = newName;
    }
    setDate(newDate) {
        this.todoDate = newDate;
    }
    setImportance(importance) {
        const importanceVal = Importance[importance] !== undefined ? Importance[importance] : Importance.Medium;
        this.importance = importanceVal;
    }
    createElement() {
        const elem = (0, test_1.createTaskElem)(this.getTaskId(), this.name);
        return elem;
    }
}
exports.Todo = Todo;
function* returnID(index = 0) {
    let idx = index;
    while (true) {
        yield idx++;
    }
}
function maxID(todos) {
    let _max = 0;
    for (let i of todos) {
        if (i["id"] > _max) {
            _max = i["id"];
        }
    }
    return _max;
}
function setLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getLocalStorage() {
    return JSON.parse(localStorage.getItem("todos"));
}
function todosFromLocalStorage() {
    console.log("LOCAL TODOS");
    let localTodos = getLocalStorage();
    if (localTodos) {
        let todoArray = [];
        localTodos.forEach(itm => {
            todoArray.push(new Todo(itm["id"], itm["name"], itm["status"], itm["todoDate"], itm["importance"]));
        });
        return todoArray;
    }
    return null;
}
var RenderStatus;
(function (RenderStatus) {
    RenderStatus["All"] = "All";
    RenderStatus["InProgress"] = "InProgress";
    RenderStatus["Complete"] = "Complete";
    RenderStatus["Sorted"] = "Sorted";
})(RenderStatus || (RenderStatus = {}));
class TodoList {
    constructor(listElement) {
        this.tasksMap = new Map();
        this.listElement = listElement;
        this.todoElements = [];
        this.addTaskButton = document.querySelector(".add-task-btn");
        // tasks.forEach(task => this.tasksMap.set(task.getTaskId(), task));
        this.id = returnID();
        this.todoBtn = document.querySelector(".add-task-todo");
        this.doneBtn = document.querySelector(".add-task-done");
        this.allBtn = document.querySelector(".add-task-all");
        this.sortBtn = document.querySelector(".add-task-sort");
        this.remainingTodos = document.querySelector(".remaining-tasks");
        this.addTasksFromLocal();
        this.addTaskButton.addEventListener("click", () => {
            const taskName = document.querySelector(".add-task-input");
            const taskDate = document.querySelector(".add-task-date");
            const taskImportance = document.querySelector(".add-task-importance");
            const taskImportanceValue = taskImportance.options[taskImportance.selectedIndex];
            const id = this.addTask(taskName.value, taskDate.value, taskImportanceValue.value);
            this.createTaskElement(id);
            this.addEventListenersToElem(this.todoElements[this.todoElements.length - 1].getAttribute("class").split("-")[1]);
            this.setTasksInLocalStorage();
        });
        //refactor colour changes too messy
        this.todoBtn.addEventListener("click", () => {
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
        });
        this.doneBtn.addEventListener("click", () => {
            console.log("todo");
            this.renderfiltered("Complete");
            this.todoBtn.style.backgroundColor = "black";
            this.todoBtn.style.color = "white";
            this.doneBtn.style.backgroundColor = "white";
            this.doneBtn.style.color = "black";
            this.allBtn.style.backgroundColor = "black";
            this.allBtn.style.color = "white";
            this.sortBtn.style.backgroundColor = "black";
            this.sortBtn.style.color = "white";
        });
        this.allBtn.addEventListener("click", () => {
            console.log("All");
            this.renderfiltered("All");
            this.todoBtn.style.backgroundColor = "black";
            this.todoBtn.style.color = "white";
            this.doneBtn.style.backgroundColor = "black";
            this.doneBtn.style.color = "white";
            this.allBtn.style.backgroundColor = "white";
            this.allBtn.style.color = "black";
            this.sortBtn.style.backgroundColor = "black";
            this.sortBtn.style.color = "white";
        });
        this.sortBtn.addEventListener("click", () => {
            console.log("sort");
            this.renderfiltered("Sorted");
            this.todoBtn.style.backgroundColor = "black";
            this.todoBtn.style.color = "white";
            this.doneBtn.style.backgroundColor = "black";
            this.doneBtn.style.color = "white";
            this.allBtn.style.backgroundColor = "black";
            this.allBtn.style.color = "white";
            this.sortBtn.style.backgroundColor = "white";
            this.sortBtn.style.color = "black";
            // this.setTasksInLocalStorage()
        });
    }
    setTasksInLocalStorage() {
        setLocalStorage([...this.tasksMap.values()]);
    }
    addTask(taskName, taskDate, importance) {
        const taskId = this.id.next().value;
        //@ts-ignore
        let task = new Todo(taskId, taskName, "InProgress", taskDate, importance);
        this.tasksMap.set(taskId, task);
        console.log(this.tasksMap);
        this.setRemainingTasks();
        return taskId;
    }
    setRemainingTasks() {
        const remainingTodos = this.countRemainingTasks() | 0;
        this.remainingTodos.textContent = `${remainingTodos} todos remaining`;
        return;
    }
    flagHighImportance(filtered) {
        filtered.forEach(itm => {
            if (itm.importance === Importance.High) {
                const elemName = document.querySelector(`.todo-${itm.getTaskId()}`);
                elemName.style.borderLeft = '5px solid #8b0000';
            }
        });
        return;
    }
    addTasksFromLocal() {
        let todos = todosFromLocalStorage();
        this.id = todos !== null ? returnID(maxID(todos) + 1) : returnID();
        todos.forEach(todo => {
            const taskId = todo["id"];
            this.tasksMap.set(taskId, todo);
        });
        this.createTaskElements();
        this.addEventListenersToAllElems();
        this.setRemainingTasks();
        return;
    }
    getList() {
        return [...this.tasksMap.values()];
    }
    getTaskById(id) {
        return this.tasksMap.get(id);
    }
    taskCompleted(id) {
        this.tasksMap.get(id).markedCompleted();
    }
    changeTaskAttribute(id, attribute, param) {
        switch (attribute) {
            case TaskAttribute.Date:
                this.tasksMap.get(id).setDate(param);
                break;
            case TaskAttribute.Importance:
                this.tasksMap.get(id).setImportance(param);
                break;
            case TaskAttribute.Name:
                this.tasksMap.get(id).setName(param);
                break;
        }
    }
    countRemainingTasks() {
        return this.filterStatus("InProgress")
            .length;
    }
    filterStatus(status) {
        return [...this.tasksMap.values()]
            .filter(task => task.status === status);
    }
    sortByDate() {
        let taskArray = [...this.tasksMap.values()];
        console.log("before");
        console.log(taskArray);
        taskArray.sort((a, b) => {
            return new Date(a.todoDate).valueOf() - new Date(b.todoDate).valueOf();
        });
        console.log("after");
        console.log(taskArray);
        return taskArray;
    }
    renderfiltered(status) {
        // let filtered = status === RenderStatus.All ? [...this.tasksMap.values()] : this.filterStatus(status)
        console.log(`STATUS: ${status}`);
        let filtered = status === RenderStatus.All ? [...this.tasksMap.values()] :
            status === RenderStatus.Sorted ? this.sortByDate()
                : this.filterStatus(status);
        console.log(filtered);
        // let filteredElems: HTMLElement[] = []
        this.todoElements = [];
        filtered.forEach(task => {
            const elem = task.createElement();
            this.todoElements.push(elem);
        });
        this.listElement.replaceChildren(...this.todoElements);
        this.addEventListenersToAllElems();
        this.markCompleted(filtered);
        this.flagHighImportance(filtered);
        return;
    }
    markCompleted(filtered) {
        filtered.forEach(itm => {
            if (itm.status === RenderStatus.Complete) {
                const elemName = document.querySelector(`.todo-name-${itm.getTaskId()}`);
                elemName.style.textDecorationLine = 'line-through';
            }
        });
        return;
    }
    createTaskElements() {
        [...this.tasksMap.values()].forEach(itm => {
            const elem = itm.createElement();
            (0, test_1.appendTaskDiv)(this.listElement, elem);
            const elemName = document.querySelector(`.todo-name-${itm.getTaskId()}`);
            const elemdiv = document.querySelector(`.todo-${itm.getTaskId()}`);
            if (itm.status === RenderStatus.Complete) {
                elemName.style.textDecorationLine = 'line-through';
            }
            if (itm.importance === Importance.High) {
                elemdiv.style.borderLeft = '5px solid #8b0000';
            }
            this.todoElements.push(elem);
        });
        return;
    }
    createTaskElement(id) {
        const elem = this.tasksMap.get(id).createElement();
        (0, test_1.appendTaskDiv)(this.listElement, elem);
        console.log("TESTTTINGGG");
        console.log(this.tasksMap.get(id).importance);
        console.log(elem);
        if (this.tasksMap.get(id).importance === Importance.High) {
            elem.style.borderLeft = '5px solid #8b0000';
        }
        this.todoElements.push(elem);
        return;
    }
    addEventListeners() {
        this.todoElements.forEach(e => {
            console.log(e);
            (0, test_1.addListener)(e);
        });
        return;
    }
    addEventListenersToAllElems() {
        console.log(this.todoElements);
        this.todoElements.forEach(itm => {
            const elemId = itm.getAttribute("class").split("-")[1];
            this.addEventListenersToElem(elemId);
        });
        return;
    }
    //clean up
    addEventListenersToElem(elemId) {
        const completeElem = document.querySelector(`.complete-${elemId}`);
        const editElem = document.querySelector(`.edit-${elemId}`);
        const deleteElem = document.querySelector(`.delete-${elemId}`);
        completeElem.addEventListener("click", () => {
            const elem = document.querySelector(`.todo-name-${elemId}`);
            if (elem.style.textDecorationLine === "none") {
                elem.style.textDecorationLine = 'line-through';
                this.tasksMap.get(Number(elemId)).markedCompleted();
                this.setRemainingTasks();
                this.setTasksInLocalStorage();
                console.log(this.tasksMap.get(Number(elemId)));
            }
            else {
                elem.style.textDecorationLine = 'none';
                this.tasksMap.get(Number(elemId)).setInProgress();
                this.setRemainingTasks();
                this.setTasksInLocalStorage();
                console.log(this.tasksMap.get(Number(elemId)));
            }
        });
        editElem.addEventListener("click", () => {
            console.log(`edit-${elemId}`);
        });
        deleteElem.addEventListener("click", () => {
            const elem = document.querySelector(`.todo-${elemId}`);
            elem.remove();
            this.tasksMap.delete(Number(elemId));
            this.setRemainingTasks();
            this.setTasksInLocalStorage();
        });
        return;
    }
}
exports.TodoList = TodoList;
