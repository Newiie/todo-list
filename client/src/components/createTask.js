// creates a new task object
export const createTask = () => {
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

// converts the task template into a node element
export const createElementTask = () => {   
    const taskTemplateContainer = document.querySelector("#task-template");
    
    const taskTemplate = document.importNode(taskTemplateContainer.content, true);
    const taskDescription = taskTemplate.querySelector("[data-task-description]");
    const taskCheckBox = taskTemplate.querySelector("[data-task-checkbox]");
    const taskEditBtn = taskTemplate.querySelector("[data-task-edit]");
    const taskDeleteBtn = taskTemplate.querySelector("[data-task-delete]");
    const taskInfoBtn = taskTemplate.querySelector("[data-task-info]");
    const taskElement = taskTemplate.querySelector("[data-task-body]")

    return {
        taskTemplate,
        taskDescription,
        taskCheckBox,
        taskEditBtn,
        taskDeleteBtn,
        taskInfoBtn,
        taskElement
    }
}