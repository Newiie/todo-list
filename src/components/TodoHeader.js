const todoHeader = document.querySelector("[data-todo-header]");

export const changeTodoHeaderTitle = (project) => {
    todoHeader.textContent = project.name;
}

export const createTodoHeader = (projectName) => {
    const Element = document.createElement("p");
    Element.textContent = projectName;
    return Element;
}