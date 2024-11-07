import { renderProject, renderTask } from "./DOM";
import { clearSelectedIcon, editProject, saveAndRenderProject, saveAndRenderTask } from "./util";
import { LOCAL_STORAGE_PROJECTS_KEY, LOCAL_STORAGE_SELECTED_PROJECT_KEY } from "./config";
// DOM Elements variables
const addProjectBtn = document.querySelector("[data-ap-add-btn]");
const addProjectContainer = document.querySelector("[data-add-project-container]");
const iconsContainer = document.querySelector("[data-icons-container]");
const projectTitle = document.querySelector("[data-add-project-text-title]");
const deleteModal = document.querySelector("[data-delete-modal]");

// Global Variables 
let selectedProjectArray = "";
export let selectedTask = "";
export let selectedProject = null;

export function setSelectedProject(project) {
    selectedProject = project;
}

export function setSelectedTask(task) {
    selectedTask = task;
}
// Selects a project from the localstorage that was previously selected
selectedProject = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY)) || "";

// retrieves projects from localstorage and creates a default project if there are none
export let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || [
    {
        id: "123123123",
        name: "asd",
        icon: "fa-book",
        tasks: [
            {
                id: '123123',
                title: "Sample Project",
                complete: true,
                description: "This is a sample description.", 
                date: "2022-07-07", 
                priority: "important"
            }
        ]
    }
];


// Selects a project from the localstorage that was previously selected
export const selectProject = (selected) => {
    selectedProject = document.getElementById(selected.id);
}

// ---------- CRUD FOR PROJECT COMPONENTS ---------------

// Creates a new project
export function createProject(name, icon) {
    return {
        id: Date.now().toString(),
        name: name,
        icon: icon,
        tasks: []
    }
}

// Clears the elements
export const clearElement = (elements) => {
    while (elements.firstElementChild) {
        elements.removeChild(elements.firstElementChild);
    }
}

// Adds a new project
export const addProject = () => {
    addProjectBtn.addEventListener('click', () => {
        const selectedIcon = iconsContainer.querySelector(".icon-selected");
        if (!selectedIcon || projectTitle.value === '') return;
        const iconID = selectedIcon.getAttribute("id");
        if (addProjectBtn.textContent == "Add") {
            projects.push(createProject(projectTitle.value, iconID));
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

// Deletes a project
export const deleteProject = () => {
    projects = projects.filter(project => project.id != selectedProject.id) 
    saveAndRenderProject(projects);
}

// Edits a project
export function infoEdit(id) {
    selectedProjectArray = projects.find(project => project.id == id);
    projectTitle.value = selectedProjectArray.name;
    clearSelectedIcon();
    iconsContainer.querySelector(`#${selectedProjectArray.icon}`).classList.add("icon-selected");
}


// ---------- CRUD FOR TASK ---------------

// Creates a new task
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

// Adds a new task
export const addTask = () => {
    const projectID =  selectedProject.getAttribute("id");
    const project = projects.find(project => project.id == projectID);
    project.tasks.push(createTask());
    saveAndRenderTask();
}

// Edits a task
export const editTask = () => {
    const taskId = selectedTask.getAttribute("id");
    const projectID =  selectedProject.getAttribute("id");

    // Finds the task that belongs to the project
    const taskItem = projects.find(project => project.id == projectID).tasks.find(task => task.id == taskId);
    
    const taskForm = document.querySelector("[data-task-form");
    const taskTitle = taskForm.querySelector("[data-task-title]")
    const taskDescription = taskForm.querySelector("[data-task-description]");
    const taskDate = taskForm.querySelector("[data-task-date]");
    const taskPriority = taskForm.querySelector("[data-task-priority]");

    // Dom manipulation
    taskDescription.textContent = '';
    taskItem.title = taskTitle.value;
    taskItem.description = taskDescription.value;
    taskItem.date = taskDate.value;
    taskItem.priority = taskPriority.value;
}

// Deletes a task
export const deleteTask = () => {
    const taskId = selectedTask.getAttribute("id");
    const projectId = selectedProject.getAttribute("id");

    // Finds the project that the task belongs to
    const projectItem = projects.find(project => project.id == projectId);
    // Deletes the task from the project
    projectItem.tasks = projectItem.tasks.filter(task => task.id != taskId);

    saveAndRenderTask();
}




const render = () => {
    addProject();
}

export default render;