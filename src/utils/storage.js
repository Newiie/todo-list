import { LOCAL_STORAGE_PROJECTS_KEY, LOCAL_STORAGE_SELECTED_PROJECT_KEY } from "./config";
import { projects, selectedProject } from "./constants";
import { renderProject } from "../domEvents";
import { renderTask } from "../domEvents";
import { clearElement } from "../util";

// Saves the projects and selected project to localstorage
export function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, JSON.stringify(selectedProject || ""));
}

// Saves the projects and renders the project
export function saveAndRenderProject(projects) {
    save();
    renderProject(projects);
}

// Saves the projects and renders the task
export function saveAndRenderTask() {
    const taskContainer = document.querySelector("[data-task-container]");
    const projectID =  selectedProject.getAttribute("id");
    const project = projects.find(project => project.id == projectID);

    save()
    clearElement(taskContainer);

    if (project) {
        project.tasks.forEach(task => renderTask(task));
    }
}