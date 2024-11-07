import { LOCAL_STORAGE_PROJECTS_KEY, LOCAL_STORAGE_SELECTED_PROJECT_KEY } from "./config";

// Global Variables 
let selectedProject = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY)) || "";

export function setSelectedProject(project) {
    selectedProject = project;
}
export let selectedTask = "";
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
