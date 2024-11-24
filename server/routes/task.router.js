
import { 
    getTasks, 
    createTask, 
    deleteTask, 
    updateTask, 
    getTaskById 
} from '../controller/tasks.controller.js';
import express from 'express';

const taskRouter = express.Router();

taskRouter.get('/', getTasks);
taskRouter.get('/:id', getTaskById);
taskRouter.post('/', createTask);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;