const TaskForm = () => {
    const taskForm = document.querySelector("[data-task-form");

    const taskTitle = taskForm.querySelector("[data-task-title]")
    const taskDescription = taskForm.querySelector("[data-task-description]");
    const taskDate = taskForm.querySelector("[data-task-date]");
    const taskPriority = taskForm.querySelector("[data-task-priority]");


    return {
        taskTitle,
        taskDescription,
        taskDate,
        taskPriority
    }
}

export default TaskForm;

