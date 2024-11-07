import { LOCAL_STORAGE_PROJECTS_KEY, LOCAL_STORAGE_SELECTED_PROJECT_KEY } from "./config";

// Global Variables 
let selectedProject = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY)) || "";
let selectedTask = "";
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || [
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