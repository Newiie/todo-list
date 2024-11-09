// todo header component
import createIcon from "./createIcon";
import { clearElement } from "../utils/util";

// ---------- DOM ELEMENTS ---------------
const todoHeader = document.querySelector("[data-todo-header]");
const allTasksBtn = document.querySelector("[data-all-tasks]");

// changes the todo header title
export const changeTodoHeaderTitle = (project) => {
    if (project == null) {
        handleHeaderUpdate();
    } else {
        todoHeader.textContent = project.name;
    }
}

// creates a todo header element
export const createTodoHeader = (projectName) => {
    const Element = document.createElement("p");
    Element.textContent = projectName;
    return Element;
}

// handles the reset of the header when a project is deleted
const handleHeaderUpdate = () => {
    const icon = createIcon("fa-calendar-days");
    const text = createTodoHeader("All");
    clearElement(todoHeader);

    todoHeader.appendChild(icon);
    todoHeader.appendChild(text);

    allTasksBtn.classList.add("project-selected");
}