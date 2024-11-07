const Task = (title, description, date, priority, complete) => {
    return {
        id: Date.now().toString(),
        title,
        description,
        date,
        priority,
        complete
    }
}

export default Task;
