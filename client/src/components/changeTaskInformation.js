export const changeTaskInformation = (task) => {       
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

    return {
        infoTitle,
        infoDesc,
        infoDate,
        infoPrio,
        infoProject
    }
}