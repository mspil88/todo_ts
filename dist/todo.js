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
    constructor(id, name, status, todoDate, importance) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.todoDate = todoDate;
        this.importance = importance;
        this.id = id;
        this.name = name;
        this.status = status;
        this.todoDate = todoDate;
        this.importance = importance;
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
}
exports.Todo = Todo;
class TodoList {
    constructor(tasks) {
        this.tasksMap = new Map();
        tasks.forEach(task => this.tasksMap.set(task.getTaskId(), task));
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
        return [...this.tasksMap.values()]
            .filter(task => task.status !== "Complete")
            .length;
    }
}
exports.TodoList = TodoList;
