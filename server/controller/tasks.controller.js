
const getTasks = (req, res) => {
    res.status(200).json(tasks);
}

const getTaskById = (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id == id);
    res.status(200).json(task);
}

const createTask = (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json(newTask);
}

const updateTask = (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    tasks = tasks.map(task => task.id == id ? updatedTask : task);
    res.status(200).json(updatedTask);
}

const deleteTask = (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id != id);
    res.status(200).json({ message: "Task deleted", tasks });
}

export { 
    getTasks, 
    getTaskById,
    createTask,
    updateTask, 
    deleteTask };