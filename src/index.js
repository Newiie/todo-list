import { allTasks, todayTasks, weeklyTasks, completedTasks, importantTasks } from "./utils/taskFilters";
import { clearElement, clearInput, clearSelectedIcon, populateEditTaskContainer } from "./utils/util";
import { selectedProject, selectedTask, projects, setSelectedProject, setSelectedTask, findProject, importantFlag, setImportantFlag, addTask, editTask, deleteTask } from "./utils/constants";
import { saveAndRenderTask } from "./utils/storage";
import { createTodoHeader } from "./components/TodoHeader";
import createIcon from "./components/createIcon";
import { changeTaskInformation } from "./components/changeTaskInformation";
import { createProject } from "./components/createProject";
import { addProject, deleteProject, infoEdit } from "./models/Project";
import { createElementTask } from "./components/createTask";

// ---------- DOM ELEMENTS FOR CONTAINERS ---------------
const projectContainer = document.querySelector("[data-project-container]");
const taskContainer = document.querySelector("[data-task-container]");
const addProjectContainer = document.querySelector("[data-add-project-container]");
const addTaskContainer = document.querySelector("[data-add-task-container]");
const iconsContainer = document.querySelector("[data-icons-container]");
const taskForm = document.querySelector("[data-task-form");
    
// ---------- DOM ELEMENTS FOR ADD BTNS ---------------
const addProjectBtn = document.querySelector("[data-ap-add-btn]");
const addProjectBtnContainer = document.querySelector("[data-add-project-btn]");
const addTaskContainerBtn = document.querySelector("[data-add-task]");

// ---------- DOM ELEMENTS FOR CLOSE BTNS ---------------
const closeProjectBtn = document.querySelector("[data-close-project-btn]");
const addTaskCloseBtn = document.querySelector("[data-at-close-btn]");
const dmCloseBtn = document.querySelector("[data-dm-close-button]");
const imCloseBtn = document.querySelector("[data-im-close-btn]")

// ---------- DOM ELEMENTS FOR CANCEL BTNS ---------------
const apCancelBtn = document.querySelector("[data-ap-cancel-btn]");
const addTaskCancelBtn = document.querySelector("[data-at-cancel-btn]");
const dmCancelBtn = document.querySelector("[data-dm-cancel-btn]");
const dmDeleteBtn = document.querySelector("[data-dm-delete-btn]");

// ---------- DOM ELEMENTS FOR HEADER ---------------
const todoHeader = document.querySelector("[data-todo-header]");
const dueDates = document.querySelector("[data-due-dates]");
const deleteModal = document.querySelector("[data-delete-modal]");
const dueDate = dueDates.querySelectorAll(".date");

const infoModal = document.querySelector("[data-info-modal]")
const infoModalCancelBtn = document.querySelector("[ data-info-cancel-btn]")

// ---------- DOM ELEMENTS FOR DATES ---------------
const allTasksBtn = document.querySelector("[data-all-tasks]");
const todayTasksBtn = document.querySelector("[data-today-tasks]");
const weeklyTasksBtn = document.querySelector("[data-weekly-tasks]");
const importantTasksBtn = document.querySelector("[data-important-tasks]");
const completedTasksBtn = document.querySelector("[data-completed-tasks]");

// ---------- DOM ELEMENTS FOR MENU ---------------
const menuBtn = document.querySelector("[data-menu-btn]")
const headerDiv = document.querySelector("[data-nav-bar]")

// ---------- EVENTS FOR DUE DATES ---------------
const dueDateEvents = () => {
    dueDates.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() == "li") {
            // Update header with selected date
            const val = `<i class="${e.target.firstElementChild.className}"></i>` +
            `<p>${e.target.textContent}</p>`;
            todoHeader.innerHTML = val;

            // Deselect any previously selected project
            if (document.querySelector(".project-selected"))
                document.querySelector(".project-selected").classList.remove("project-selected");
            e.target.classList.add("project-selected");
        }
    });

    // Filter tasks by date
    allTasksBtn.addEventListener('click', allTasks);
    todayTasksBtn.addEventListener('click', todayTasks);
    weeklyTasksBtn.addEventListener('click', weeklyTasks);
    importantTasksBtn.addEventListener('click', importantTasks);
    completedTasksBtn.addEventListener('click', completedTasks);
}

const deleteModalEvents = () => {
    dmCloseBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none'; 
    })

    dmCancelBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none'; 
    })

    dmDeleteBtn.addEventListener('click', () => {
        (deleteModal.getAttribute("id") == 'project-deletion') ? deleteProject() : deleteTask();
        deleteModal.removeAttribute("id");
        deleteModal.style.display = 'none'; 
    })
}

const addTaskEvents = () => {
    addTaskCancelBtn.addEventListener('click', () => {
        addTaskContainer.style.display = 'none';
    })

    addTaskCloseBtn.addEventListener('click', () => {
        addTaskContainer.style.display = 'none';
    })

    addTaskContainerBtn.addEventListener('click', () => {
        clearInput(addTaskContainer);
        addTaskContainer.style.display = 'flex';
        const taskTitle = addTaskContainer.querySelector("[data-project-title]")
        const taskEditBtn = addTaskContainer.querySelector("[data-add-task-btn]");

        taskTitle.textContent = 'Add Task';
        taskEditBtn.textContent = 'Add';
    })
}

const infoModalEvents = () => {
    infoModalCancelBtn.addEventListener('click', () => {
        infoModal.style.display = 'none';
    })
    imCloseBtn.addEventListener('click', () => {
        infoModal.style.display = 'none';
    })
}

const addProjectEvents = () => {
    addProjectBtnContainer.addEventListener('click', () => {
        addProjectContainer.style.display = "flex";
    })  

    addProjectBtn.addEventListener('click', addProject)

    closeProjectBtn.addEventListener('click', () => {
        addProjectContainer.style.display = "none";
        const pcTitle = addProjectContainer.querySelector("h2");
        pcTitle.textContent = "Add Project";
        clearInput(addProjectContainer);
        clearSelectedIcon();
        addProjectBtn.textContent = "Add";
    })

    apCancelBtn.addEventListener('click', () => {
        addProjectContainer.style.display = "none";
        const pcTitle = addProjectContainer.querySelector("h2");

        pcTitle.textContent = "Add Project";
        clearInput(addProjectContainer);
        clearSelectedIcon();
        addProjectBtn.textContent = "Add";
    })
}

// ---------- EVENTS FOR BTNS ---------------
const buttonEvents = () => {
    const prioritySelect = document.getElementById("prioritySelect");

    prioritySelect.addEventListener("change", function() {
        const selectedOption = prioritySelect.options[prioritySelect.selectedIndex];

        if (selectedOption.value !== "choosepriority") {
            prioritySelect.options[0].disabled = true;
        }
    });

    menuBtn.addEventListener('click', () => {
        console.log(headerDiv)
        headerDiv.classList.toggle("active");
    })

    dueDate.forEach(date => date.addEventListener('click', () => {
        addTaskContainerBtn.style.display = 'none'
    }))
  
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskFormBtn = taskForm.querySelector("[data-add-task-btn]")
        if (taskFormBtn.textContent == "Add") { 
            addTask();
            addTaskContainer.style.display = 'none';
        } else {
            console.log("Done editing", selectedProject);
            editTask();
            if (importantFlag) {
                importantTasks();
            } else {
                saveAndRenderTask();
            }
            addTaskContainer.style.display = 'none';
        }
    });

    taskContainer.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase != 'div' && !e.target.classList.contains("task")) return;
        setSelectedTask(e.target);
    })


    addProjectEvents();
    addTaskEvents();
    infoModalEvents();
    deleteModalEvents();
}

// ---------- EVENTS FOR ICONS ---------------
const iconsEvent = () => {
    iconsContainer.addEventListener('click', (e) => {
       if(e.target.tagName.toLowerCase() == 'div') {
        if (!e.target.classList.contains("icon")) return;
        const selectedIcon = iconsContainer.querySelector(".icon-selected");
        if (selectedIcon)
                selectedIcon.classList.remove("icon-selected");
        e.target.classList.add("icon-selected");
       }
    });

    projectContainer.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() == 'div' && e.target.classList.contains("project")) {
            if (document.querySelector(".project-selected"))
                document.querySelector(".project-selected").classList.remove("project-selected");
            e.target.classList.add("project-selected");

            console.log("e.target", e.target)
            console.log("selectedProject", selectedProject)
            setSelectedProject(e.target)
            saveAndRenderTask();
        }
    })
    
}

// ---------- Render a task based on the task object and binds events to it ---------------
export const renderTask = (task) => {
    
    const { taskTemplate, taskDescription, taskCheckBox, taskEditBtn, taskDeleteBtn, taskInfoBtn, taskElement } = createElementTask();

    // Binds the events each of these btns
    taskInfoBtn.addEventListener('click', () => {
        const { infoProject } = changeTaskInformation(task);

        findProject(taskInfoBtn.closest("[data-task-body]").getAttribute("id"));
        infoProject.textContent = projects.find(project => project.id == selectedProject.getAttribute("id")).name;

        infoModal.style.display = 'flex';
    })

    taskEditBtn.addEventListener('click', () => {
        const taskTitle = addTaskContainer.querySelector("[data-project-title]")
        const taskFormEditBtn = addTaskContainer.querySelector("[data-add-task-btn]");

        clearInput(addTaskContainer);
        addTaskContainer.style.display = 'flex';
        taskTitle.textContent = 'Edit Task';
        taskFormEditBtn.textContent = 'Edit';

        if (selectedProject == "Important") {
            setImportantFlag(true);
        }

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

        if (selectedTask) {
            const taskId = selectedTask.getAttribute("id");
            projects.find(project => project.tasks.find(task => {
                task.id == taskId ? task.complete = taskCheckBox.checked : '';
                taskDescription.classList.toggle("line-through")
            }))
        }
        
        saveAndRenderTask();
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
        const projectIcon = createIcon(project.icon);
        const { projectElement,projectContent, projectLabel, iconEditable, projectE, projectDeleteBtn} = createProject();
        
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
            const projectIcon = createIcon(project.icon);
            const todoHeaderElement = createTodoHeader(project.name);

            clearElement(todoHeader)

            todoHeader.textContent = '';
            todoHeader.append(projectIcon);
            todoHeader.append(todoHeaderElement)

            addTask.style.display = 'flex';
        })

        // Sets the id of the project
        projectE.setAttribute("id", project.id);
        projectLabel.textContent = project.name;
        projectContent.insertBefore(projectIcon, projectContent.firstElementChild);
        
        projectContainer.append(projectElement);
    })
}

// ------ BIND ALL EVENTS ---------------
const events = () => {
    buttonEvents();
    dueDateEvents();
    iconsEvent();
    renderProject(projects);
    projects.length == 0 ? document.querySelector(".no-projects").classList.add("show") : '';
}

document.addEventListener('DOMContentLoaded', events);  