const projectTemplate = document.getElementById("project-template");

// creates a new project object
export const createProject = () => {
    const projectElement = document.importNode(projectTemplate.content, true);

    const projectContent = projectElement.querySelector(".project-content");
    const projectLabel = projectElement.querySelector(".project-label");
    const iconEditable = projectElement.querySelector("[data-project-edit]");
    const projectE = projectElement.querySelector(".project");
    const projectDeleteBtn = projectElement.querySelector("[data-project-delete-btn]")

    return {
        projectElement,
        projectContent,
        projectLabel,
        iconEditable,
        projectE,
        projectDeleteBtn
    }
}