"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addListener = exports.remainingDaysFromNow = exports.completeListener = exports.appendTaskDiv = exports.createTaskElem = void 0;
function createTaskElem(taskItemId, taskItemName) {
    const taskDiv = document.createElement("div");
    const taskName = document.createElement("p");
    const completeTask = document.createElement("i");
    const editTask = document.createElement("i");
    const deleteTask = document.createElement("i");
    taskDiv.setAttribute("class", `todoItem todo-${taskItemId}`);
    taskName.setAttribute("class", `todoItem-name todo-name-${taskItemId}`);
    completeTask.setAttribute("class", `fas fa-check-circle fa-lg complete-${taskItemId}`);
    completeTask.setAttribute("id", `complete-${taskItemId}`);
    editTask.setAttribute("class", `fas fa-wrench fa-lg edit-${taskItemId}`);
    deleteTask.setAttribute("class", `fas fa-trash fa-lg delete-${taskItemId}`);
    taskName.textContent = taskItemName;
    taskDiv.appendChild(taskName);
    taskDiv.appendChild(completeTask);
    taskDiv.appendChild(editTask);
    taskDiv.appendChild(deleteTask);
    return taskDiv;
}
exports.createTaskElem = createTaskElem;
function appendTaskDiv(taskList, taskDiv) {
    taskList.append(taskDiv);
}
exports.appendTaskDiv = appendTaskDiv;
function completeListener(elem) {
    const elemId = elem.getAttribute("class").split("-")[1];
    elem.addEventListener("click", (e) => {
        console.log(`complete-${elemId}`);
    });
    return;
}
exports.completeListener = completeListener;
var BtnTypes;
(function (BtnTypes) {
    BtnTypes["sort"] = "sort";
    BtnTypes["todo"] = "todo";
    BtnTypes["done"] = "done";
    BtnTypes["all"] = "all";
})(BtnTypes || (BtnTypes = {}));
function remainingDaysFromNow(date) {
    const now = new Date();
    const taskDate = new Date(date);
    return Math.abs(now.getDate() - taskDate.getDate());
}
exports.remainingDaysFromNow = remainingDaysFromNow;
//probably needs adding to the class
function addListener(elem) {
    const elemId = elem.getAttribute("class").split("-")[1];
    const completeElem = document.querySelector(`.complete-${elemId}`);
    const editElem = document.querySelector(`.edit-${elemId}`);
    const deleteElem = document.querySelector(`.delete-${elemId}`);
    completeElem.addEventListener("click", () => {
        const elem = document.querySelector(`.todo-name-${elemId}`);
        if (elem.style.textDecorationLine === "none") {
            elem.style.textDecorationLine = 'line-through';
            console.log(this);
        }
        else {
            elem.style.textDecorationLine = 'none';
        }
    });
    editElem.addEventListener("click", () => {
        console.log(`edit-${elemId}`);
    });
    deleteElem.addEventListener("click", () => {
        const elem = document.querySelector(`.todo-${elemId}`);
        elem.remove();
    });
    return;
}
exports.addListener = addListener;
exports.default = addListener;
