// import { getProjects, getSelectedProject } from "./storage";
// import { createTask } from "../components/createTask";
// import { saveAndRenderTask } from "./storage";
// import TaskForm from "../components/TaskForm";

// // Global Variables 
// let selectedProjectArray = "";
// let selectedProject = getSelectedProject();
// let selectedTask = "";
// let projects = getProjects();
// let importantFlag = false;

// // Important Flag methods
// const setImportantFlag = (flag) => {
//     importantFlag = flag;
// }

// // Project methods
// const setSelectedProjectArray = (project) => {
//     selectedProjectArray = project;
// }

// // Task methods
// function setSelectedTask(task) {
//     selectedTask = task;
// }
// const addTask = () => {
//     const projectID = selectedProject.getAttribute("id");
//     const project = projects.find(project => project.id == projectID);
//     project.tasks.push(createTask());
    
//     saveAndRenderTask();
// }
// const editTask = () => {
//     const taskId = selectedTask.getAttribute("id");
//     const projectID =  selectedProject.getAttribute("id");

//     const taskItem = projects.find(project => project.id == projectID).tasks.find(task => task.id == taskId);
   
//     const taskForm = TaskForm();
//     taskForm.taskDescription.textContent = '';

//     taskItem.title = taskForm.taskTitle.value;
//     taskItem.description = taskForm.taskDescription.value;
//     taskItem.date = taskForm.taskDate.value;
//     taskItem.priority = taskForm.taskPriority.value;

    
//     saveAndRenderTask();
// }
// const deleteTask = () => {
//     const taskId = selectedTask.getAttribute("id");
//     const projectId = selectedProject.getAttribute("id");

//     const projectItem = projects.find(project => project.id == projectId);
//     projectItem.tasks = projectItem.tasks.filter(task => task.id != taskId);

//     saveAndRenderTask();
// }

// // Project methods
// function setSelectedProject(project) {
//     selectedProject = project;
// }

// const findProject = (taskId) => {
//     const project = projects.find(project => project.tasks.find(task => task.id == taskId))
//     setSelectedProject(document.getElementById(project.id));
// }

// function setProjects(projects) {
//     projects = projects;
// }

// function removeProject(projectId) {
//     projects = projects.filter(project => project.id != projectId);
// }

// export { 
//     selectedProject, 
//     selectedTask, 
//     projects, 
//     selectedProjectArray,
//     importantFlag,
//     setSelectedProject, 
//     setSelectedTask,
//     findProject,
//     setProjects,
//     removeProject,
//     setSelectedProjectArray,
//     setImportantFlag,
//     addTask,
//     editTask,
//     deleteTask
// }