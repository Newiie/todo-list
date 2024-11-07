import render from './CRUD'
import events from './DOM'
import { allTasks } from './taskFilters';
import { save } from './util';

render();
events();
save();
allTasks();