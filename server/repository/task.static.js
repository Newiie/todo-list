import { projects } from "./project.static.js";

const getTasks = () => projects.map(project => project.tasks);
const addTask = (task) => projects.push(task);
const getTaskById = (id) => projects.find(project => project.tasks.find(task => task.id == id));    
const updateTask = (id, task) => projects = projects.map(project => project.tasks.map(task => task.id == id ? task : task));
const deleteTask = (id) => projects = projects.map(project => project.tasks.filter(task => task.id != id));

export { 
    getTasks, 
    addTask, 
    getTaskById,
    updateTask,
    deleteTask
};