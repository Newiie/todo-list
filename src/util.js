import { clearElement } from "./CRUD";
import { projects, selectedProject, selectedTask, setSelectedProject } from "./constants";
import { LOCAL_STORAGE_PROJECTS_KEY, LOCAL_STORAGE_SELECTED_PROJECT_KEY } from "./config";

const taskContainer = document.querySelector("[data-task-container]");
const addProjectBtn = document.querySelector("[data-ap-add-btn]");
const addProjectContainer = document.querySelector("[data-add-project-container]");
const projectTitle = document.querySelector("[data-add-project-text-title]");

export const editProject = (selectedProject, icon, name) => {
    const child = selectedProject.querySelector(".fa-solid");
    const projectContent = selectedProject.querySelector(".project-content");
    const projectLabel = selectedProject.querySelector(".project-label");
    const newIcon = document.createElement("i");
    const pcTitle = addProjectContainer.querySelector("h2");

    projectContent.removeChild(child);
    newIcon.classList.add("fa-solid", `${icon}`)
    projectContent.insertBefore(newIcon, projectContent.firstElementChild);
    projectLabel.textContent = name;
    addProjectContainer.style.display = 'none';
    clearSelectedIcon();
    projectTitle.value = '';
    pcTitle.textContent = "Add Project";
    addProjectBtn.textContent = "Add";
}

// Clears the icon-selected class from all icons
export const clearSelectedIcon = () => {
    const selectedIcons = document.querySelectorAll(".icon-selected");
    selectedIcons.forEach(si => si.classList.remove("icon-selected"));
}

// Clears the input fields
export const clearInput = (container) => {
    const inputs = container.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
    const textContainer = container.querySelector("textarea")
    if (textContainer) {
        textContainer.value = '';
    }
}

// Populates the edit task container with the selected task's data
export const populateEditTaskContainer = () => {
    const taskId = selectedTask.getAttribute("id");
    const projectID =  selectedProject.getAttribute("id");

    const taskItem = projects.find(project => project.id == projectID).tasks.find(task => task.id == taskId);

    const taskForm = document.querySelector("[data-task-form");
    const taskTitle = taskForm.querySelector("[data-task-title]")
    const taskDescription = taskForm.querySelector("[data-task-description]");
    const taskDate = taskForm.querySelector("[data-task-date]");
    const taskPriority = taskForm.querySelector("[data-task-priority]");

    taskTitle.value = taskItem.title;
    taskDescription.value = taskItem.description;
    taskDate.value = taskItem.date;
    taskPriority.value = taskItem.priority;
}

// Saves the projects and selected project to localstorage
export function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, JSON.stringify(selectedProject || ""));
}

// Saves the projects and renders the project
export function saveAndRenderProject(projects) {
    save();
    renderProject(projects);
}

// Saves the projects and renders the task
export function saveAndRenderTask() {
    const projectID =  selectedProject.getAttribute("id");
    const project = projects.find(project => project.id == projectID);
    save()
    clearElement(taskContainer);
    project.tasks.forEach(task => renderTask(task));
}

// Selects a project from the localstorage that was previously selected
export const selectProject = (selected) => {
    setSelectedProject(document.getElementById(selected.id));
}

// Finds the project that contains the task and selects it
export const findProject = (taskId) => {
    const project = projects.find(project => project.tasks.find(task => task.id == taskId))
    selectProject(project);
}

// ---------- Render a task based on the task object and binds events to it ---------------
export const renderTask = (task) => {
    const taskTemplateContainer = document.querySelector("#task-template");
    
    // converts the task template into a node element
    const taskTemplate = document.importNode(taskTemplateContainer.content, true);
    const taskDescription = taskTemplate.querySelector("[data-task-description]");
    const taskCheckBox = taskTemplate.querySelector("[data-task-checkbox]");
    const taskEditBtn = taskTemplate.querySelector("[data-task-edit]");
    const taskDeleteBtn = taskTemplate.querySelector("[data-task-delete]");
    const taskInfoBtn = taskTemplate.querySelector("[data-task-info]");
    const taskElement = taskTemplate.querySelector("[data-task-body]")

    // Binds the events each of these btns
    taskInfoBtn.addEventListener('click', () => {
        const infoTitle = document.querySelector("[data-info-title]")
        const infoDesc = document.querySelector("[data-info-desc]");
        const infoDate = document.querySelector("[data-info-date]")
        const infoPrio = document.querySelector("[data-info-prio]")
        const infoProject = document.querySelector("[data-info-project]")

        infoTitle.textContent = '';
        infoDesc.textContent = '';
        infoDate.textContent = '';
        infoPrio.textContent = '';
        infoProject.textContent = '';

        infoTitle.textContent = task.title
        infoDesc.textContent = task.description
        infoDate.textContent = task.date
        infoPrio.textContent = task.priority;

        findProject(taskInfoBtn.closest("[data-task-body]").getAttribute("id"));
        infoProject.textContent = projects.find(project => project.id == selectedProject.getAttribute("id")).name;
        console.log(selectedProject);

        infoModal.style.display = 'flex';
    })

    taskEditBtn.addEventListener('click', () => {
    
        const taskTitle = addTaskContainer.querySelector("[data-project-title]")
        const taskFormEditBtn = addTaskContainer.querySelector("[data-add-task-btn]");

        clearInput(addTaskContainer);
        addTaskContainer.style.display = 'flex';
        taskTitle.textContent = 'Edit Task';
        taskFormEditBtn.textContent = 'Edit';
        
        setSelectedTask(taskEditBtn.closest("[data-task-body]"));
        findProject(taskEditBtn.closest("[data-task-body]").getAttribute("id"));

        populateEditTaskContainer();
    })

    taskDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'flex'; 
        deleteModal.setAttribute("id", "task-deletion")
        const dmLabel = deleteModal.querySelector(".dm-label");

        setSelectedTask(taskDeleteBtn.closest("[data-task-body]"));
        findProject(taskDeleteBtn.closest("[data-task-body]").getAttribute("id"));
        
        const taskId = selectedTask.getAttribute("id");
        const projectId = selectedProject.getAttribute("id");
        dmLabel.textContent = projects.find(project => project.id == projectId).tasks.find(task => task.id == taskId).title;
    })

    taskCheckBox.addEventListener('click', () => {
        setSelectedTask(taskCheckBox.closest("[data-task-body]"));

        const taskId = selectedTask.getAttribute("id");
        projects.find(project => project.tasks.find(task => {
            task.id == taskId ? task.complete = taskCheckBox.checked : '';
            taskDescription.classList.toggle("line-through")
        }))
        
        save();
    })

    // Sets the id of the task and checks if it is complete
    taskElement.setAttribute("id", task.id);
    taskCheckBox.checked = task.complete;
    task.complete ? taskDescription.classList.add("line-through") : ''
    taskDescription.textContent = task.title;
    taskContainer.append(taskTemplate); 
}

// ---------- Render a projects based on the projects array ---------------
export const renderProject = (projects) => {
    clearElement(projectContainer);
    projects.forEach(project => {
        const iconElement = document.createElement("i");

        // converts the project template into a node element
        const projectElement = document.importNode(projectTemplate.content, true);
        const iconId = project.icon;
        chosenIcon(iconId, iconElement);

        // Selects the elements of the project
        const projectContent = projectElement.querySelector(".project-content");
        const projectLabel = projectElement.querySelector(".project-label");
        const iconEditable = projectElement.querySelector("[data-project-edit]");
        const projectE = projectElement.querySelector(".project");
        const projectDeleteBtn = projectElement.querySelector("[data-project-delete-btn]")
        const addTask = document.querySelector("[data-add-task]");

        // Binds the events each of these btns 
        iconEditable.addEventListener('click', () => {
            const pcTitle = addProjectContainer.querySelector("h2");
            pcTitle.textContent = "Edit Project";
            setSelectedProject(iconEditable.closest(".project"));
            addProjectBtn.textContent = "Edit";
            infoEdit(selectedProject.getAttribute("id"))
            addProjectContainer.style.display = "flex";
        })
        
        projectDeleteBtn.addEventListener('click', () => {
            const deleteLabel = deleteModal.querySelector(".dm-label");
            deleteModal.setAttribute("id", "project-deletion");
            deleteModal.style.display = 'flex';
            setSelectedProject(projectDeleteBtn.closest(".project"));
            const project = projects.find(project => project.id == selectedProject.id);
            deleteLabel.textContent = `${project.name}`;
        })
   
        projectE.addEventListener('click', () => {
            const iconId = project.icon;
            const iconElement = document.createElement("i");
            const todoHeaderElement = document.createElement("p")
            addTask.style.display = 'flex';
            chosenIcon(iconId, iconElement)
            todoHeaderElement.textContent = project.name;
            clearElement(todoHeader)
            todoHeader.textContent = '';
            todoHeader.append(iconElement);
            todoHeader.append(todoHeaderElement)
        })

        // Sets the id of the project
        projectE.setAttribute("id", project.id);
        projectLabel.textContent = project.name;
        projectContent.insertBefore(iconElement, projectContent.firstElementChild);

        
        projectContainer.append(projectElement);
    })
}


// Chooses the icon based on the iconId and adds it to the iconElement
export function chosenIcon(iconId, iconElement) {
    switch (iconId) {
        case "fa-book":
            iconElement.classList.add("fa-solid", "fa-book");
            break;
        case "fa-hammer":
            iconElement.classList.add("fa-solid", "fa-hammer");
            break;
        case "fa-volleyball":
            iconElement.classList.add("fa-solid", "fa-volleyball");
            break;
        case "fa-sack-dollar":
            iconElement.classList.add("fa-solid", "fa-sack-dollar");
            break;
        case "fa-pizza-slice":
            iconElement.classList.add("fa-solid", "fa-pizza-slice");
            break;
        case "fa-school":
            iconElement.classList.add("fa-solid", "fa-school");
            break;
        case "fa-gift":
            iconElement.classList.add("fa-solid", "fa-gift");
            break;
    }
}