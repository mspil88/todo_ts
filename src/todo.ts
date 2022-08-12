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

enum Status {
    Complete = "Complete",
    InProgress = "InProgress"
}

enum Importance {
    High = "High",
    Medium = "Medium",
    Low = "Low"
}

class Todo {
    constructor(private id: number, public name: string, public status: string, public todoDate: string, 
        public importance: string) {
            this.id = id;
            this.name = name;
            this.status = status;
            this.todoDate = todoDate;
            this.importance = importance;
    }

    getTask(): object {
        return {name: this.name, 
                status: this.status, 
                todo_date: this.todoDate,
                importance: this.importance}
    }

    markedCompleted(): void {
        this.status = Status.Complete;
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
}