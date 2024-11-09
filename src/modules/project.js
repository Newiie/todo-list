import { getProjects, getSelectedProject } from "../utils/storage";

let selectedProject = getSelectedProject();
let projects = getProjects();

const setSelectedProject = (project) => {
    selectedProject = project;
}

const setProjects = (newProjects) => {
    projects = newProjects;
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
    findProject
};
