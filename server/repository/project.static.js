const projects = [];

const addProject = (project) => projects.push(project);  
const getProjects = () => projects;
const getProjectById = (id) => projects.find(project => project.id == id);
const deleteProject = (id) => projects = projects.filter(project => project.id != id);
const updateProject = (id, project) => projects = projects.map(project => project.id == id ? project : project);

export { 
    projects,
    addProject, 
    getProjects, 
    getProjectById, 
    deleteProject, 
    updateProject 
};