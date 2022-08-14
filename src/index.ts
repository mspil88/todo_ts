import {Todo, TodoList, Status, Importance} from "./todo";
import {setDate} from "./setDate";



let test: Todo[] = [new Todo(1, "take out bins", "InProgress", "12/08/2021", "medium"),
                    new Todo(2, "MOT", "InProgress", "14/08/2021", "high"),
                    new Todo(3, "Tidy Kitchen", "InProgress", "15/08/2021", "low")]


const dayElem: HTMLParagraphElement = document.querySelector(".date-day");
const monthElem: HTMLParagraphElement = document.querySelector(".date-month");
const listContainer: HTMLDialogElement = document.querySelector(".todoList-container")


let list = new TodoList(test, listContainer);
console.log(list.getList())
console.log(`Remaning Tasks ${list.countRemainingTasks()}`)
list.taskCompleted(3);
console.log(`Remaning Tasks ${list.countRemainingTasks()}`)
list.taskCompleted(2);
console.log(`Remaning Tasks ${list.countRemainingTasks()}`)


setDate(dayElem, monthElem);

list.createTaskElements();
list.addEventListeners();

// console.log(list.getList())
// list.changeTaskAttribute(3, "importance", "High")
// console.log(list.getList())
// list.changeTaskAttribute(2, "name", "Sort MOT")
// console.log(list.getList())
// list.changeTaskAttribute(1, "date", "18/08/2021")
// console.log(list.getList())