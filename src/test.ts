export function createTaskElem(taskItemId: number, taskItemName: string): HTMLElement {
    
    const taskDiv: HTMLDivElement = document.createElement("div");
    const taskName: HTMLParagraphElement = document.createElement("p");
    const completeTask: HTMLElement = document.createElement("i");
    const editTask: HTMLElement = document.createElement("i");
    const deleteTask: HTMLElement = document.createElement("i");
   
    taskDiv.setAttribute("class", `todoItem todo-${taskItemId}`)
    taskName.setAttribute("class", `todoItem-name todo-name-${taskItemId}`)
    completeTask.setAttribute("class", `fas fa-check-circle fa-lg complete-${taskItemId}`)

    completeTask.setAttribute("id", `complete-${taskItemId}`)
    editTask.setAttribute("class", `fas fa-wrench fa-lg edit-${taskItemId}`)
    deleteTask.setAttribute("class", `fas fa-trash fa-lg delete-${taskItemId}`)

    taskName.textContent = taskItemName

    taskDiv.appendChild(taskName)
    taskDiv.appendChild(completeTask)
    taskDiv.appendChild(editTask)
    taskDiv.appendChild(deleteTask)
    

    return taskDiv    
}

export function appendTaskDiv(taskList: HTMLElement, taskDiv: HTMLElement): void {
    taskList.append(taskDiv)
}

export function completeListener(elem: HTMLElement): HTMLElement {
    
    const elemId: string = elem.getAttribute("class").split("-")[1];
    elem.addEventListener("click", (e)=> {
        console.log(`complete-${elemId}`);
        
    })
    return;
}

export function addListener(elem: HTMLElement): HTMLElement {
    const elemId: string = elem.getAttribute("class").split("-")[1];
    
    const completeElem = document.querySelector(`.complete-${elemId}`);
    const editElem = document.querySelector(`.edit-${elemId}`);
    const deleteElem = document.querySelector(`.delete-${elemId}`);

    completeElem.addEventListener("click", ()=> {
        console.log(`complete-${elemId}`);
    });
    
    editElem.addEventListener("click", ()=> {
        console.log(`edit-${elemId}`);
    });
    deleteElem.addEventListener("click", ()=> {
        console.log(`delete-${elemId}`);
    });
    
    return;
}



export default addListener
