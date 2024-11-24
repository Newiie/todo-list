import { LOCAL_STORAGE_PROJECTS_KEY, LOCAL_STORAGE_SELECTED_PROJECT_KEY } from "./config";
import { projects, selectedProject, setProjects } from "../modules/project";
import { renderProject } from "../index";
import { renderTask } from "../index";
import { todayTasks, weeklyTasks, importantTasks, completedTasks, allTasks } from "./taskFilters";
import TaskModel from "../models/Task";
import ProjectModel from "../models/Project";
import { clearElement } from "./util";

// Dummy data
const dummyTask = TaskModel("Sample Task", "This is a sample description.", "2022-07-07", "important", true);
const dummyProject = ProjectModel("Sample Project", "fa-book", [dummyTask]);


/*
 * Fetch the projects from the backend
 * @returns {Promise<Project[]>}
 */

export const getProjects = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        if (data.length == 0) return [dummyProject];
        return data;
    } catch (error) {
        console.error(error);
        return [dummyProject]; 
    }
};

/*
 * Load the projects
 */

export const loadProjects = async () => {
    setProjects(await getProjects())
    console.log("PROJECTS", projects);
    saveAndRenderProject(projects);
};

/*
 * Save the projects and selected project to the local storage
 */
export function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, JSON.stringify(selectedProject || ""));

    fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projects)
    }).catch(error => console.error('Error saving projects:', error));
}


/*
 * Get the selected project from the local storage
 * @returns {string}
 */
export const getSelectedProject = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY)) || "";
};

/*
 * Save the projects and render the project
 * calls save() method
 * @param {Project[]} projects
 */

export function saveAndRenderProject(projects) {
    save();
    renderProject(projects);

    // Shows the no projects message if there are no projects
    projects.length == 0 ? document.querySelector(".no-projects").classList.add("show") : document.querySelector(".no-projects").classList.remove("show");
}


/*
 * Save the tasks and render the task
 * calls save() method
 */
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