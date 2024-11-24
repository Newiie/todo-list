import { getProjects, getSelectedProject } from "../utils/storage";

/*
 * This module manages projects using a functional approach.
 * It provides CRUD operations for projects model and ensures encapsulation. (kind of)
 * I did not add getters because it is already incorporated to use projects variable
 */


// Variables
let selectedProject = getSelectedProject();
let projects = [];


const setSelectedProject = (project) => {
    selectedProject = project;
}

const setProjects = (newProjects) => {
    projects = newProjects;
}

const editProject = (projectId, icon, name) => {
    const project = projects.find(project => project.id == projectId);
    project.icon = icon;
    project.name = name;
}

const removeProject = (projectId) => {
    projects = projects.filter(project => project.id != projectId);
}

const findProject = (taskId) => {
    const project = projects.find(project => project.tasks.find(task => task.id == taskId));
    setSelectedProject(document.getElementById(project.id));
}

export {
    selectedProject,
    projects,
    setSelectedProject,
    setProjects,
    removeProject,
    findProject,
    editProject
};
