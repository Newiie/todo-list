import { clearElement, projects, selectProject, selectedProject, selectedTask } from "./CRUD";
import { renderProject, renderTask } from "./DOM";

const taskContainer = document.querySelector("[data-task-container]");
const addProjectBtn = document.querySelector("[data-ap-add-btn]");
const addProjectContainer = document.querySelector("[data-add-project-container]");
const projectTitle = document.querySelector("[data-add-project-text-title]");

export const editProject = (selectedProject, icon, name) => {
    const child = selectedProject.querySelector(".fa-solid");
    const projectContent = selectedProject.querySelector(".project-content");
    const projectLabel = selectedProject.querySelector(".project-label");
    const newIcon = document.createElement("i");
    const pcTitle = addProjectContainer.querySelector("h2");

    projectContent.removeChild(child);
    newIcon.classList.add("fa-solid", `${icon}`)
    projectContent.insertBefore(newIcon, projectContent.firstElementChild);
    projectLabel.textContent = name;
    addProjectContainer.style.display = 'none';
    clearSelectedIcon();
    projectTitle.value = '';
    pcTitle.textContent = "Add Project";
    addProjectBtn.textContent = "Add";
}


export const clearSelectedIcon = () => {
    const selectedIcons = document.querySelectorAll(".icon-selected");
    selectedIcons.forEach(si => si.classList.remove("icon-selected"));
}

export const clearInput = (container) => {
    const inputs = container.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
    const textContainer = container.querySelector("textarea")
    textContainer.value = '';
}

export const populateEditTaskContainer = () => {
    const taskId = selectedTask.getAttribute("id");
    const projectID =  selectedProject.getAttribute("id");

    const taskItem = projects.find(project => project.id == projectID).tasks.find(task => task.id == taskId);

    const taskForm = document.querySelector("[data-task-form");
    const taskTitle = taskForm.querySelector("[data-task-title]")
    const taskDescription = taskForm.querySelector("[data-task-description]");
    const taskDate = taskForm.querySelector("[data-task-date]");
    const taskPriority = taskForm.querySelector("[data-task-priority]");

    taskTitle.value = taskItem.title;
    taskDescription.value = taskItem.description;
    taskDate.value = taskItem.date;
    taskPriority.value = taskItem.priority;
}

export const LOCAL_STORAGE_PROJECTS_KEY = 'todo-list.projects'
export const LOCAL_STORAGE_SELECTED_PROJECT_KEY = 'todo-list.selectedProject';

export function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, JSON.stringify(selectedProject));
}

export function saveAndRenderProject(projects) {
    save();
    renderProject(projects);
}

export function saveAndRenderTask() {
    const projectID =  selectedProject.getAttribute("id");
    const project = projects.find(project => project.id == projectID);
    save()
    clearElement(taskContainer);
    project.tasks.forEach(task => renderTask(task));
}

export const findProject = (taskId) => {
    const project = projects.find(project => project.tasks.find(task => task.id == taskId))
    selectProject(project);
}

export function chosenIcon(iconId, iconElement) {
    switch (iconId) {
        case "fa-book":
            iconElement.classList.add("fa-solid", "fa-book");
            break;
        case "fa-hammer":
            iconElement.classList.add("fa-solid", "fa-hammer");
            break;
        case "fa-volleyball":
            iconElement.classList.add("fa-solid", "fa-volleyball");
            break;
        case "fa-sack-dollar":
            iconElement.classList.add("fa-solid", "fa-sack-dollar");
            break;
        case "fa-pizza-slice":
            iconElement.classList.add("fa-solid", "fa-pizza-slice");
            break;
        case "fa-school":
            iconElement.classList.add("fa-solid", "fa-school");
            break;
        case "fa-gift":
            iconElement.classList.add("fa-solid", "fa-gift");
            break;
    }
}