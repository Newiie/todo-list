/*
 * These are the helper variables that makes the dynamic functionality possible
 * Important flag is for the important tasks filter 
 * selectedProjectArray is for the project filter 
 */


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
