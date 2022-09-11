import {Todo, TodoList, Status, Importance} from "./todo";
import {setDate} from "./setDate";

const dayElem: HTMLParagraphElement = document.querySelector(".date-day");
const monthElem: HTMLParagraphElement = document.querySelector(".date-month");
const listContainer: HTMLDialogElement = document.querySelector(".todoList-container")

let list = new TodoList(listContainer);

setDate(dayElem, monthElem);
console.log(localStorage.getItem("todos"))