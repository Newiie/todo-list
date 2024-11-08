import { LOCAL_STORAGE_PROJECTS_KEY, LOCAL_STORAGE_SELECTED_PROJECT_KEY } from "./config";
import { projects, selectedProject } from "./constants";
import { renderProject } from "..";
import { renderTask } from "..";
import { todayTasks, weeklyTasks, importantTasks, completedTasks, allTasks } from "./taskFilters";
import TaskModel from "../models/Task";
import ProjectModel from "../models/Project";
import { clearElement } from "../util";

// Dummy data
const dummyTask = TaskModel("Sample Task", "This is a sample description.", "2022-07-07", "important", true);
const dummyProject = ProjectModel("Sample Project", "fa-book", [dummyTask]);

// Saves the projects and selected project to localstorage
export function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, JSON.stringify(selectedProject || ""));
}

// Gets the projects from localstorage
export const getProjects = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || [
        dummyProject
    ];
}

// Gets the saved selected project from localstorage
export const getSelectedProject = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY)) || "";
}

// Saves the projects and renders the project
export function saveAndRenderProject(projects) {
    save();
    renderProject(projects);
}

// Saves the projects and renders the task
export function saveAndRenderTask() {
    const taskContainer = document.querySelector("[data-task-container]");
    clearElement(taskContainer);
    save();
    // Renders the task based on the navigation buttons
    if (typeof selectedProject == "string") {
        if (selectedProject == "All") allTasks();
        else if (selectedProject == "Today") todayTasks();
        else if (selectedProject == "Weekly") weeklyTasks();
        else if (selectedProject == "Important") importantTasks();
        else if (selectedProject == "Completed") completedTasks();

        return; 
    }

    // If no selected project, return
    if (!selectedProject) return;
    
    // Renders the task based on the project
    const projectID =  selectedProject.getAttribute("id");
    const project = projects.find(project => project.id == projectID);

    // If project not found, return
    if (!project) return;
    project.tasks.forEach(task => renderTask(task));

}