// creates an icon element
const createIcon = (icon) => {
    const iconElement = document.createElement("i");
    iconElement.classList.add(`${icon == "fa-calendar-days" ? "fa-regular" : "fa-solid"}`, `${icon}`);
    return iconElement;
}

export default createIcon;