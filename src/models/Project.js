import { saveAndRenderProject, saveAndRenderTask } from "../utils/storage";
import { clearSelectedIcon } from "../utils/util";
import { changeTodoHeaderTitle } from "../components/todoHeader";
import { removeProject , projects, selectedProject, editProject} from "../modules/project";
import { setSelectedProjectArray, selectedProjectArray } from "../modules/helper";
import createIcon from "../components/createIcon";
const projectTitle = document.querySelector("[data-add-project-text-title]");

// creates a new project object
const ProjectModel = (name, icon, tasks) => {
    return {
        id: Date.now().toString(),
        name,
        icon,
        tasks: tasks ? [...tasks] : []
    }
}

// ---------DOM operations for the project---------

export const addProject = () => {
    const addProjectBtn = document.querySelector("[data-ap-add-btn]");
    const addProjectContainer = document.querySelector("[data-add-project-container]");
    const iconsContainer = document.querySelector("[data-icons-container]");
    const selectedIcon = iconsContainer.querySelector(".icon-selected");
    const errorMsg = addProjectContainer.querySelector("[data-ap-error-msg]");
    // Checks if the icon is selected and the project title is not empty
    if (!selectedIcon || projectTitle.value === '') {
       
        errorMsg.classList.add("show");
        return;
    };

    const iconID = selectedIcon.getAttribute("id");

    // Checks if the button text content is "Add" else it would perform and edit operation
    if (addProjectBtn.textContent == "Add") {
        projects.push(ProjectModel(projectTitle.value, iconID));
        saveAndRenderProject(projects);

        projectTitle.value = '';
        selectedIcon.classList.remove("icon-selected");
        addProjectContainer.classList.remove("active");
        addProjectContainer.classList.add("inactive");
    } else {
        selectedProjectArray.icon = iconID;
        selectedProjectArray.name = projectTitle.value;
        editProject(selectedProject.id, iconID, projectTitle.value)
        
        saveAndRenderProject(projects);

        addProjectContainer.classList.remove("active");
        addProjectContainer.classList.add("inactive");
    }

    errorMsg.classList.remove("show");
}




export const deleteProject = () => {
    removeProject(selectedProject.id);
    saveAndRenderProject(projects);
    saveAndRenderTask();
    changeTodoHeaderTitle(null);
}


export const infoEdit = (id) => {
    const iconsContainer = document.querySelector("[data-icons-container]");
    setSelectedProjectArray(projects.find(project => project.id == id));
    projectTitle.value = selectedProjectArray.name;
    clearSelectedIcon();
    iconsContainer.querySelector(`#${selectedProjectArray.icon}`).classList.add("icon-selected");
}

export default ProjectModel;