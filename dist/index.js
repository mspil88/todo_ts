"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("./todo");
const setDate_1 = require("./setDate");
let test = [new todo_1.Todo(1, "take out bins", "InProgress", "12/08/2021", "medium"),
    new todo_1.Todo(2, "MOT", "InProgress", "14/08/2021", "high"),
    new todo_1.Todo(3, "Tidy Kitchen", "InProgress", "15/08/2021", "low")];
let list = new todo_1.TodoList(test);
console.log(list.getList());
console.log(`Remaning Tasks ${list.countRemainingTasks()}`);
list.taskCompleted(3);
console.log(`Remaning Tasks ${list.countRemainingTasks()}`);
list.taskCompleted(2);
console.log(`Remaning Tasks ${list.countRemainingTasks()}`);
const dayElem = document.querySelector(".date-day");
const monthElem = document.querySelector(".date-month");
setDate_1.setDate(dayElem, monthElem);
// console.log(list.getList())
// list.changeTaskAttribute(3, "importance", "High")
// console.log(list.getList())
// list.changeTaskAttribute(2, "name", "Sort MOT")
// console.log(list.getList())
// list.changeTaskAttribute(1, "date", "18/08/2021")
// console.log(list.getList())
