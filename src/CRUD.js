import { clearSelectedIcon, editProject, saveAndRenderProject, saveAndRenderTask } from "./util";
import { selectedProject, selectedTask, projects, removeProject } from "./utils/constants";

import { createTask } from "./components/createTask";
import Project from "./models/Project";
import TaskForm from "./components/TaskForm";

// DOM Elements variables
const addProjectBtn = document.querySelector("[data-ap-add-btn]");
const addProjectContainer = document.querySelector("[data-add-project-container]");
const iconsContainer = document.querySelector("[data-icons-container]");
const projectTitle = document.querySelector("[data-add-project-text-title]");
const deleteModal = document.querySelector("[data-delete-modal]");

// helper variable
let selectedProjectArray = "";

// Selects a project from the localstorage that was previously selected
export const selectProject = (selected) => {
    selectedProject = document.getElementById(selected.id);
}



// calls an event listener to the add project button
export const addProject = () => {
    addProjectBtn.addEventListener('click', () => {
        const selectedIcon = iconsContainer.querySelector(".icon-selected");
        if (!selectedIcon || projectTitle.value === '') return;
        const iconID = selectedIcon.getAttribute("id");
        if (addProjectBtn.textContent == "Add") {
            projects.push(Project(projectTitle.value, iconID));
            saveAndRenderProject(projects);

            projectTitle.value = '';
            selectedIcon.classList.remove("icon-selected");
            addProjectContainer.style.display = 'none';
        } else {
            selectedProjectArray.icon = iconID;
            selectedProjectArray.name = projectTitle.value;
            editProject(selectedProject, iconID, projectTitle.value)
        }
    })
}

export const deleteProject = () => {
    removeProject(selectedProject.id);
    saveAndRenderProject(projects);
    saveAndRenderTask();
}

export function infoEdit(id) {
    selectedProjectArray = projects.find(project => project.id == id);
    projectTitle.value = selectedProjectArray.name;
    clearSelectedIcon();
    iconsContainer.querySelector(`#${selectedProjectArray.icon}`).classList.add("icon-selected");
}

export const addTask = () => {
    const projectID =  selectedProject.getAttribute("id");
    const project = projects.find(project => project.id == projectID);
    project.tasks.push(createTask());
    saveAndRenderTask();
}

export const editTask = () => {
    const taskId = selectedTask.getAttribute("id");
    const projectID =  selectedProject.getAttribute("id");

    const taskItem = projects.find(project => project.id == projectID).tasks.find(task => task.id == taskId);
   
    const taskForm = TaskForm();
    taskForm.taskDescription.textContent = '';

    taskItem.title = taskForm.taskTitle.value;
    taskItem.description = taskForm.taskDescription.value;
    taskItem.date = taskForm.taskDate.value;
    taskItem.priority = taskForm.taskPriority.value;
}

export const deleteTask = () => {
    const taskId = selectedTask.getAttribute("id");
    const projectId = selectedProject.getAttribute("id");

    const projectItem = projects.find(project => project.id == projectId);
    projectItem.tasks = projectItem.tasks.filter(task => task.id != taskId);

    saveAndRenderTask();
}




const render = () => {
    addProject();
}

export default render;