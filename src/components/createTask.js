export function createTask() {
    const taskForm = document.querySelector("[data-task-form");
    const taskTitle = taskForm.querySelector("[data-task-title]")
    const taskDescription = taskForm.querySelector("[data-task-description]");
    const taskDate = taskForm.querySelector("[data-task-date]");
    const taskPriority = taskForm.querySelector("[data-task-priority]");

    return {
        id: Date.now().toString(),
        title: taskTitle.value,
        completed: false,
        description: taskDescription.value, 
        date: taskDate.value,
        priority: taskPriority.value
    };
}