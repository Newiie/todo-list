// ---------- HELPER VARIABLES ---------------
let importantFlag = false;
let selectedProjectArray = "";

// Project methods
const setSelectedProjectArray = (project) => {
    selectedProjectArray = project;
}

// set the important flag
const setImportantFlag = (flag) => {
    importantFlag = flag;
}

export {
    importantFlag,
    selectedProjectArray,
    setSelectedProjectArray,
    setImportantFlag
};
