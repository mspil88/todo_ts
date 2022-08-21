import {Todo, TodoList, Status, Importance} from "./todo";
import {setDate} from "./setDate";



let test: Todo[] | undefined= [new Todo(1, "take out bins", "InProgress", "12/08/2021", "medium"),
                    new Todo(2, "MOT", "InProgress", "14/08/2021", "high"),
                    new Todo(3, "Tidy Kitchen", "InProgress", "15/08/2021", "low")]


const dayElem: HTMLParagraphElement = document.querySelector(".date-day");
const monthElem: HTMLParagraphElement = document.querySelector(".date-month");
const listContainer: HTMLDialogElement = document.querySelector(".todoList-container")

let list = new TodoList(test, listContainer);

setDate(dayElem, monthElem);
console.log(localStorage.getItem("todos"))