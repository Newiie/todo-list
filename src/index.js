import render from './ui'
import events from './domEvents'
import { allTasks } from './taskFilters';
import { save } from './utils/storage';

render();
events();
save();
allTasks();