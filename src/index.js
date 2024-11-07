import render from './CRUD'
import events from './DOM'
import { AllTasks } from './NavFilters';
import { save } from './util';

render();
events();
save();
AllTasks();