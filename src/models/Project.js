const Project = (name, icon, tasks) => {
    return {
        id: Date.now().toString(),
        name,
        icon,
        tasks: tasks ? [...tasks] : []
    }
}

export default Project;