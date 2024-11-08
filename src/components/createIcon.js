// creates an icon element
const createIcon = (icon) => {
    const iconElement = document.createElement("i");
    iconElement.classList.add("fa-solid", `${icon}`);
    return iconElement;
}

export default createIcon;