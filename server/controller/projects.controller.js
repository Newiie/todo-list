import { projects } from "../repository/project.static.js";

const getProjects = (req, res) => {
    res.status(200).json(projects);
}

const getProjectById = (req, res) => {
    const { id } = req.params;
    const project = projects.find(project => project.id == id);
    res.status(200).json(project);
}

const createProject = (req, res) => {
    const newProject = req.body;
    projects.push(newProject);
    res.status(201).json(newProject);
}

const updateProject = (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;
    projects = projects.map(project => project.id == id ? updatedProject : project);
    res.status(200).json(updatedProject);
}

const deleteProject = (req, res) => {
    const { id } = req.params;
    projects = projects.filter(project => project.id != id);
    res.status(200).json({ message: "Project deleted", projects });
}

export { 
    getProjects, 
    getProjectById, 
    createProject, 
    updateProject, 
    deleteProject 
};