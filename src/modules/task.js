import { createTask } from "../components/createTask";
import { saveAndRenderTask } from "../utils/storage";
import TaskForm from "../components/TaskForm";
import { selectedProject, projects } from "./project";

let selectedTask = "";

const setSelectedTask = (task) => {
    selectedTask = task;
}

const addTask = () => {
    const projectID = selectedProject.getAttribute("id");
    const project = projects.find(project => project.id == projectID);

    const taskForm = TaskForm();

    if (taskForm.taskTitle.value === '' || taskForm.taskDate.value === '' || taskForm.taskPriority.value === '' || taskForm.taskDescription.value === '') {
        const errorMsg = document.querySelector("[data-task-error-msg]");
        errorMsg.classList.add("show");
        return;
    }

    project.tasks.push(createTask());
    
    saveAndRenderTask();

    return true;
}

const editTask = () => {
    const errorMsg = document.querySelector("[data-task-error-msg]");
    const taskId = selectedTask.getAttribute("id");
    const projectID = selectedProject.getAttribute("id");
    const taskItem = projects.find(project => project.id == projectID).tasks.find(task => task.id == taskId);
   
    const taskForm = TaskForm();

    if (taskForm.taskTitle.value === '' || taskForm.taskDate.value === '' || taskForm.taskPriority.value === '' || taskForm.taskDescription.value === '') {
       
        errorMsg.classList.add("show");
        return;
    }

    taskForm.taskDescription.textContent = '';

    taskItem.title = taskForm.taskTitle.value;
    taskItem.description = taskForm.taskDescription.value;
    taskItem.date = taskForm.taskDate.value;
    taskItem.priority = taskForm.taskPriority.value;

    saveAndRenderTask();
  
    return 1;
}

const deleteTask = () => {
    const taskId = selectedTask.getAttribute("id");
    const projectId = selectedProject.getAttribute("id");

    const projectItem = projects.find(project => project.id == projectId);
    projectItem.tasks = projectItem.tasks.filter(task => task.id != taskId);

    saveAndRenderTask();
}

export {
    selectedTask,
    setSelectedTask,
    addTask,
    editTask,
    deleteTask
};
