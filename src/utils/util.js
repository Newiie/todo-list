import { renderProject, renderTask } from "..";
import { projects, selectedProject, selectedTask, setSelectedProject } from "./constants";
import { LOCAL_STORAGE_PROJECTS_KEY, LOCAL_STORAGE_SELECTED_PROJECT_KEY } from "./config";
import TaskForm from "../components/TaskForm";

// Clears the icon-selected class from all icons
const clearSelectedIcon = () => {
    const selectedIcons = document.querySelectorAll(".icon-selected");
    selectedIcons.forEach(si => si.classList.remove("icon-selected"));
}

// loops through the elements and removes the first child until there are no children left
const clearElement = (elements) => {
    while (elements.firstElementChild) {
        elements.removeChild(elements.firstElementChild);
    }
}

// Clears the input fields
const clearInput = (container) => {
    const inputs = container.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
    const textContainer = container.querySelector("textarea")
    if (textContainer) {
        textContainer.value = '';
    }
}

// Populates the edit task container with the selected task's data
const populateEditTaskContainer = () => {
    const taskId = selectedTask.getAttribute("id");
    const projectID =  selectedProject.getAttribute("id");

    const taskItem = projects.find(project => project.id == projectID).tasks.find(task => task.id == taskId);

    populateTaskForm(taskItem);
}

// Populates the task form with the selected task's data
const populateTaskForm = (taskItem) => {
    const taskForm = TaskForm();

    const {taskTitle, taskDescription, taskDate, taskPriority} = taskForm;

    taskTitle.value = taskItem.title;
    taskDescription.value = taskItem.description;
    taskDate.value = taskItem.date;
    taskPriority.value = taskItem.priority;
}

export { 
    clearSelectedIcon, 
    clearElement, 
    clearInput, 
    populateEditTaskContainer 
}