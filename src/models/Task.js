import { projects, selectedProject, selectedTask } from "../utils/constants";
import { saveAndRenderTask } from "../utils/storage";
import { createTask } from "../components/createTask";
import TaskForm from "../components/TaskForm";

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
