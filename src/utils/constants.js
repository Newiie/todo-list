import { LOCAL_STORAGE_PROJECTS_KEY, LOCAL_STORAGE_SELECTED_PROJECT_KEY } from "./config";
import Task from "../models/Task";
import Project from "../models/Project";

const dummyTask = Task("Sample Task", "This is a sample description.", "2022-07-07", "important", true);
const dummyProject = Project("Sample Project", "fa-book", [dummyTask]);

// Global Variables 
let selectedProject = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY)) || "";
let selectedTask = "";
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || [
    dummyProject
];

function setSelectedProject(project) {
    selectedProject = project;
}

function setSelectedTask(task) {
    selectedTask = task;
}

function setProjects(projects) {
    projects = projects;
}

function removeProject(projectId) {
    projects = projects.filter(project => project.id != projectId);
}

export { 
    selectedProject, 
    selectedTask, 
    projects, 
    setSelectedProject, 
    setSelectedTask,
    setProjects,
    removeProject
}