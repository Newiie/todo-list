import render, { clearElement, projects } from "./CRUD"
import { renderTask } from "./DOM"
import { compareAsc, format, isThisWeek, parse} from 'date-fns'

const taskContainer = document.querySelector("[data-task-container]");

export const AllTasks = () => {
    clearElement(taskContainer);
    projects.forEach(project => project.tasks.forEach(task => renderTask(task)))
}

export const TodayTasks = () => {
    clearElement(taskContainer);
    const todaysDate = format(new Date(), 'yyyy-MM-dd');
    projects.forEach(project => project.tasks.forEach(task => (task.date == todaysDate) ? renderTask(task) : ''))
}

export const WeeklyTasks = () => {
    clearElement(taskContainer);
    projects.forEach(project => project.tasks.forEach(task => {
        const date = parse(task.date, 'yyyy-MM-dd', new Date());
        isThisWeek(date, {weekStartsOn: 1}) ? renderTask(task) : '';
    }))
}

export const importantTasks = () => {
    clearElement(taskContainer);
    projects.forEach(project => project.tasks.forEach(task => (task.priority === 'important') ? renderTask(task) : ''))
}

export const completedTasks = () => {
    clearElement(taskContainer);
    projects.forEach(project => project.tasks.forEach(task => (task.complete) ? renderTask(task) : ''))
}