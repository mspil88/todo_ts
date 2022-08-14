/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const todo_1 = __webpack_require__(/*! ./todo */ "./src/todo.ts");
const setDate_1 = __webpack_require__(/*! ./setDate */ "./src/setDate.ts");
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


/***/ }),

/***/ "./src/setDate.ts":
/*!************************!*\
  !*** ./src/setDate.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setDate = void 0;
function setDate(dayElem, monthElem) {
    let today = new Date();
    console.log(today);
}
exports.setDate = setDate;


/***/ }),

/***/ "./src/todo.ts":
/*!*********************!*\
  !*** ./src/todo.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


// requires (1) TODO Class (2) TODO list class
Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90eXBlcy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly90eXBlcy8uL3NyYy9zZXREYXRlLnRzIiwid2VicGFjazovL3R5cGVzLy4vc3JjL3RvZG8udHMiLCJ3ZWJwYWNrOi8vdHlwZXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHlwZXMvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxlQUFlLG1CQUFPLENBQUMsNkJBQVE7QUFDL0Isa0JBQWtCLG1CQUFPLENBQUMsbUNBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwyQkFBMkI7QUFDekQ7QUFDQSw4QkFBOEIsMkJBQTJCO0FBQ3pEO0FBQ0EsOEJBQThCLDJCQUEyQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN2QmE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7Ozs7QUNQRjtBQUNiO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGdCQUFnQixHQUFHLFlBQVksR0FBRyxxQkFBcUIsR0FBRyxrQkFBa0IsR0FBRyxjQUFjO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhCQUE4QixjQUFjLEtBQUs7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0NBQXNDLGtCQUFrQixLQUFLO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRDQUE0QyxxQkFBcUIsS0FBSztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7Ozs7Ozs7VUM5R2hCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgdG9kb18xID0gcmVxdWlyZShcIi4vdG9kb1wiKTtcclxuY29uc3Qgc2V0RGF0ZV8xID0gcmVxdWlyZShcIi4vc2V0RGF0ZVwiKTtcclxubGV0IHRlc3QgPSBbbmV3IHRvZG9fMS5Ub2RvKDEsIFwidGFrZSBvdXQgYmluc1wiLCBcIkluUHJvZ3Jlc3NcIiwgXCIxMi8wOC8yMDIxXCIsIFwibWVkaXVtXCIpLFxyXG4gICAgbmV3IHRvZG9fMS5Ub2RvKDIsIFwiTU9UXCIsIFwiSW5Qcm9ncmVzc1wiLCBcIjE0LzA4LzIwMjFcIiwgXCJoaWdoXCIpLFxyXG4gICAgbmV3IHRvZG9fMS5Ub2RvKDMsIFwiVGlkeSBLaXRjaGVuXCIsIFwiSW5Qcm9ncmVzc1wiLCBcIjE1LzA4LzIwMjFcIiwgXCJsb3dcIildO1xyXG5sZXQgbGlzdCA9IG5ldyB0b2RvXzEuVG9kb0xpc3QodGVzdCk7XHJcbmNvbnNvbGUubG9nKGxpc3QuZ2V0TGlzdCgpKTtcclxuY29uc29sZS5sb2coYFJlbWFuaW5nIFRhc2tzICR7bGlzdC5jb3VudFJlbWFpbmluZ1Rhc2tzKCl9YCk7XHJcbmxpc3QudGFza0NvbXBsZXRlZCgzKTtcclxuY29uc29sZS5sb2coYFJlbWFuaW5nIFRhc2tzICR7bGlzdC5jb3VudFJlbWFpbmluZ1Rhc2tzKCl9YCk7XHJcbmxpc3QudGFza0NvbXBsZXRlZCgyKTtcclxuY29uc29sZS5sb2coYFJlbWFuaW5nIFRhc2tzICR7bGlzdC5jb3VudFJlbWFpbmluZ1Rhc2tzKCl9YCk7XHJcbmNvbnN0IGRheUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGUtZGF5XCIpO1xyXG5jb25zdCBtb250aEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGUtbW9udGhcIik7XHJcbnNldERhdGVfMS5zZXREYXRlKGRheUVsZW0sIG1vbnRoRWxlbSk7XHJcbi8vIGNvbnNvbGUubG9nKGxpc3QuZ2V0TGlzdCgpKVxyXG4vLyBsaXN0LmNoYW5nZVRhc2tBdHRyaWJ1dGUoMywgXCJpbXBvcnRhbmNlXCIsIFwiSGlnaFwiKVxyXG4vLyBjb25zb2xlLmxvZyhsaXN0LmdldExpc3QoKSlcclxuLy8gbGlzdC5jaGFuZ2VUYXNrQXR0cmlidXRlKDIsIFwibmFtZVwiLCBcIlNvcnQgTU9UXCIpXHJcbi8vIGNvbnNvbGUubG9nKGxpc3QuZ2V0TGlzdCgpKVxyXG4vLyBsaXN0LmNoYW5nZVRhc2tBdHRyaWJ1dGUoMSwgXCJkYXRlXCIsIFwiMTgvMDgvMjAyMVwiKVxyXG4vLyBjb25zb2xlLmxvZyhsaXN0LmdldExpc3QoKSlcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zZXREYXRlID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBzZXREYXRlKGRheUVsZW0sIG1vbnRoRWxlbSkge1xyXG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnNvbGUubG9nKHRvZGF5KTtcclxufVxyXG5leHBvcnRzLnNldERhdGUgPSBzZXREYXRlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gcmVxdWlyZXMgKDEpIFRPRE8gQ2xhc3MgKDIpIFRPRE8gbGlzdCBjbGFzc1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVG9kb0xpc3QgPSBleHBvcnRzLlRvZG8gPSBleHBvcnRzLlRhc2tBdHRyaWJ1dGUgPSBleHBvcnRzLkltcG9ydGFuY2UgPSBleHBvcnRzLlN0YXR1cyA9IHZvaWQgMDtcclxuLy8gVE9ETyBDTEFTUyB0byBpbXBsZW1lbnQ6XHJcbi8vIGF0dHJpYnV0ZXM6XHJcbi8vICgxKSBJRFxyXG4vLyAoMikgTmFtZVxyXG4vLyAoMykgU3RhdHVzIC0gaW4gcHJvZ3Jlc3MsIGNvbXBsZXRlXHJcbi8vICg0KSB0b2RvIGJ5IGRhdGVcclxuLy8gKDUpIGltcG9ydGFuY2VcclxuLy8gbWV0aG9kczpcclxuLy8gKDEpIGdldHRlcnMgLSBpLmUuIGdldCB0YXNrIGluZm8gZm9yIHJlbmRlcmluZ1xyXG4vLyAoMikgbWFya2VkIGFzIGNvbXBsZXRlZFxyXG4vLyAoMykgZWRpdCBuYW1lIGFuZCBkYXRlXHJcbi8vIFRPRE8gTElTVCBDTEFTUyB0byBpbXBsbWVudDpcclxuLy8gYXR0cmlidXRlczpcclxuLy8gKDEpIHRhc2tzIGFycmF5IChlYWNoIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgVE9ETylcclxuLy8gbWV0aG9kczpcclxuLy8gKDEpIGdldCB0YXNrcyAgKGJ5IGlkKVxyXG4vLyAoMikgc29ydCB0YXNrcyBieSByZW1haW5pbmcgZGF5cyBvciBpbXBvcnRhbmNlXHJcbi8vICgzKSBkZWxldGUgdGFza1xyXG4vL2NvbnNpZGVyIGdldHRlcnMgc2V0dGVycyBpbiB0aGUgdG9kbyBsaXN0IGNsYXNzIGluc3RlYWQgb2YgdG9kbyBpdGVtP1xyXG52YXIgU3RhdHVzO1xyXG4oZnVuY3Rpb24gKFN0YXR1cykge1xyXG4gICAgU3RhdHVzW1wiQ29tcGxldGVcIl0gPSBcIkNvbXBsZXRlXCI7XHJcbiAgICBTdGF0dXNbXCJJblByb2dyZXNzXCJdID0gXCJJblByb2dyZXNzXCI7XHJcbn0pKFN0YXR1cyA9IGV4cG9ydHMuU3RhdHVzIHx8IChleHBvcnRzLlN0YXR1cyA9IHt9KSk7XHJcbnZhciBJbXBvcnRhbmNlO1xyXG4oZnVuY3Rpb24gKEltcG9ydGFuY2UpIHtcclxuICAgIEltcG9ydGFuY2VbXCJIaWdoXCJdID0gXCJIaWdoXCI7XHJcbiAgICBJbXBvcnRhbmNlW1wiTWVkaXVtXCJdID0gXCJNZWRpdW1cIjtcclxuICAgIEltcG9ydGFuY2VbXCJMb3dcIl0gPSBcIkxvd1wiO1xyXG59KShJbXBvcnRhbmNlID0gZXhwb3J0cy5JbXBvcnRhbmNlIHx8IChleHBvcnRzLkltcG9ydGFuY2UgPSB7fSkpO1xyXG52YXIgVGFza0F0dHJpYnV0ZTtcclxuKGZ1bmN0aW9uIChUYXNrQXR0cmlidXRlKSB7XHJcbiAgICBUYXNrQXR0cmlidXRlW1wiRGF0ZVwiXSA9IFwiZGF0ZVwiO1xyXG4gICAgVGFza0F0dHJpYnV0ZVtcIkltcG9ydGFuY2VcIl0gPSBcImltcG9ydGFuY2VcIjtcclxuICAgIFRhc2tBdHRyaWJ1dGVbXCJOYW1lXCJdID0gXCJuYW1lXCI7XHJcbn0pKFRhc2tBdHRyaWJ1dGUgPSBleHBvcnRzLlRhc2tBdHRyaWJ1dGUgfHwgKGV4cG9ydHMuVGFza0F0dHJpYnV0ZSA9IHt9KSk7XHJcbmNsYXNzIFRvZG8ge1xyXG4gICAgY29uc3RydWN0b3IoaWQsIG5hbWUsIHN0YXR1cywgdG9kb0RhdGUsIGltcG9ydGFuY2UpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICB0aGlzLnRvZG9EYXRlID0gdG9kb0RhdGU7XHJcbiAgICAgICAgdGhpcy5pbXBvcnRhbmNlID0gaW1wb3J0YW5jZTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICB0aGlzLnRvZG9EYXRlID0gdG9kb0RhdGU7XHJcbiAgICAgICAgdGhpcy5pbXBvcnRhbmNlID0gaW1wb3J0YW5jZTtcclxuICAgIH1cclxuICAgIGdldFRhc2soKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxyXG4gICAgICAgICAgICB0b2RvX2RhdGU6IHRoaXMudG9kb0RhdGUsXHJcbiAgICAgICAgICAgIGltcG9ydGFuY2U6IHRoaXMuaW1wb3J0YW5jZSB9O1xyXG4gICAgfVxyXG4gICAgZ2V0VGFza0lkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG4gICAgbWFya2VkQ29tcGxldGVkKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gU3RhdHVzLkNvbXBsZXRlO1xyXG4gICAgfVxyXG4gICAgc2V0TmFtZShuZXdOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmV3TmFtZTtcclxuICAgIH1cclxuICAgIHNldERhdGUobmV3RGF0ZSkge1xyXG4gICAgICAgIHRoaXMudG9kb0RhdGUgPSBuZXdEYXRlO1xyXG4gICAgfVxyXG4gICAgc2V0SW1wb3J0YW5jZShpbXBvcnRhbmNlKSB7XHJcbiAgICAgICAgY29uc3QgaW1wb3J0YW5jZVZhbCA9IEltcG9ydGFuY2VbaW1wb3J0YW5jZV0gIT09IHVuZGVmaW5lZCA/IEltcG9ydGFuY2VbaW1wb3J0YW5jZV0gOiBJbXBvcnRhbmNlLk1lZGl1bTtcclxuICAgICAgICB0aGlzLmltcG9ydGFuY2UgPSBpbXBvcnRhbmNlVmFsO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVG9kbyA9IFRvZG87XHJcbmNsYXNzIFRvZG9MaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHRhc2tzKSB7XHJcbiAgICAgICAgdGhpcy50YXNrc01hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4gdGhpcy50YXNrc01hcC5zZXQodGFzay5nZXRUYXNrSWQoKSwgdGFzaykpO1xyXG4gICAgfVxyXG4gICAgZ2V0TGlzdCgpIHtcclxuICAgICAgICByZXR1cm4gWy4uLnRoaXMudGFza3NNYXAudmFsdWVzKCldO1xyXG4gICAgfVxyXG4gICAgZ2V0VGFza0J5SWQoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YXNrc01hcC5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgdGFza0NvbXBsZXRlZChpZCkge1xyXG4gICAgICAgIHRoaXMudGFza3NNYXAuZ2V0KGlkKS5tYXJrZWRDb21wbGV0ZWQoKTtcclxuICAgIH1cclxuICAgIGNoYW5nZVRhc2tBdHRyaWJ1dGUoaWQsIGF0dHJpYnV0ZSwgcGFyYW0pIHtcclxuICAgICAgICBzd2l0Y2ggKGF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tBdHRyaWJ1dGUuRGF0ZTpcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza3NNYXAuZ2V0KGlkKS5zZXREYXRlKHBhcmFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tBdHRyaWJ1dGUuSW1wb3J0YW5jZTpcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza3NNYXAuZ2V0KGlkKS5zZXRJbXBvcnRhbmNlKHBhcmFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tBdHRyaWJ1dGUuTmFtZTpcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza3NNYXAuZ2V0KGlkKS5zZXROYW1lKHBhcmFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvdW50UmVtYWluaW5nVGFza3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLnRhc2tzTWFwLnZhbHVlcygpXVxyXG4gICAgICAgICAgICAuZmlsdGVyKHRhc2sgPT4gdGFzay5zdGF0dXMgIT09IFwiQ29tcGxldGVcIilcclxuICAgICAgICAgICAgLmxlbmd0aDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRvZG9MaXN0ID0gVG9kb0xpc3Q7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=