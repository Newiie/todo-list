// creates a new task object
const TaskModel = (title, description, date, priority, complete) => {
    return {
        id: Date.now().toString(),
        title,
        description,
        date,
        priority,
        complete
    }
}



export default TaskModel;
