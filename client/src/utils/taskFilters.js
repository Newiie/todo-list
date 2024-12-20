import  { clearElement } from "./util"
import { projects, setSelectedProject} from "../modules/project";
import { renderTask } from "../index"
import {  format, isThisWeek, parse} from 'date-fns'

/*
 * This is a module that renders tasks based on the navigation buttons
 */

const taskContainer = document.querySelector("[data-task-container]");

/*
 * Renders all tasks
 */
export const allTasks = () => {
    clearElement(taskContainer);
    
    setSelectedProject("All");

    // Retrieve all tasks and render them
    projects.forEach(project => {
        if (project.tasks.length > 0) {
            project.tasks.forEach(task => renderTask(task))
        }
    })
}


/*
 * Renders all tasks that are due today
 */

export const todayTasks = () => {
    clearElement(taskContainer);
    setSelectedProject("Today");
    const todaysDate = format(new Date(), 'yyyy-MM-dd');
    projects.forEach(project => project.tasks.forEach(task => (task.date == todaysDate) ? renderTask(task) : ''))
}

/*
 * Renders all weekly tasks using date-fns library
 */

export const weeklyTasks = () => {
    clearElement(taskContainer);
    setSelectedProject("Weekly");
    projects.forEach(project => project.tasks.forEach(task => {
        const date = parse(task.date, 'yyyy-MM-dd', new Date());
        isThisWeek(date, {weekStartsOn: 1}) ? renderTask(task) : '';
    }))
}

/*
 * Renders all tasks that are marked important
 */
export const importantTasks = () => {
    clearElement(taskContainer);
    setSelectedProject("Important");
    projects.forEach(project => project.tasks.forEach(task => (task.priority === 'important') ? renderTask(task) : ''))
}

/*
* Renders all completed tasks
*/
export const completedTasks = () => {
    clearElement(taskContainer);
    setSelectedProject("Completed");
    projects.forEach(project => project.tasks.forEach(task => (task.complete) ? renderTask(task) : ''))
}