import { renderProject, renderTask } from "./domEvents";
import { projects, selectedProject, selectedTask, setSelectedProject } from "./utils/constants";
import { LOCAL_STORAGE_PROJECTS_KEY, LOCAL_STORAGE_SELECTED_PROJECT_KEY } from "./utils/config";
import TaskForm from "./components/TaskForm";
import createIcon from "./components/createIcon";



// Clears the icon-selected class from all icons
export const clearSelectedIcon = () => {
    const selectedIcons = document.querySelectorAll(".icon-selected");
    selectedIcons.forEach(si => si.classList.remove("icon-selected"));
}

// loops through the elements and removes the first child until there are no children left
export const clearElement = (elements) => {
    while (elements.firstElementChild) {
        elements.removeChild(elements.firstElementChild);
    }
}

// Clears the input fields
export const clearInput = (container) => {
    const inputs = container.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
    const textContainer = container.querySelector("textarea")
    if (textContainer) {
        textContainer.value = '';
    }
}

// Populates the edit task container with the selected task's data
export const populateEditTaskContainer = () => {
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

// Selects a project from the localstorage that was previously selected
export const selectProject = (selected) => {
    setSelectedProject(document.getElementById(selected.id));
}

// Finds the project that contains the task and selects it
export const findProject = (taskId) => {
    const project = projects.find(project => project.tasks.find(task => task.id == taskId))
    console.log(project);
    console.log(taskId);
    selectProject(project);
}

// Edits the project
export const editProject = (selectedProject, icon, name) => {
    const addProjectContainer = document.querySelector("[data-add-project-container]");

    const projectTitle = document.querySelector("[data-add-project-text-title]");
    const addProjectBtn = document.querySelector("[data-ap-add-btn]");

    const child = selectedProject.querySelector(".fa-solid");
    const projectContent = selectedProject.querySelector(".project-content");
    const projectLabel = selectedProject.querySelector(".project-label");

    const projectIcon = createIcon(icon);
    const pcTitle = addProjectContainer.querySelector("h2");

    projectContent.removeChild(child);

    projectContent.insertBefore(projectIcon, projectContent.firstElementChild);
    projectLabel.textContent = name;
    addProjectContainer.style.display = 'none';
    clearSelectedIcon();
    
    // reset the text of the modal
    projectTitle.value = '';
    pcTitle.textContent = "Add Project";
    addProjectBtn.textContent = "Add";
}
