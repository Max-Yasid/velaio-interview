import { createActionGroup, props } from '@ngrx/store';
import { Task } from 'src/app/interfaces/Task';

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Add task': props<{ task: Task }>(),
    'Remove Task': props<{ taskId: number }>(),
    'Complete Task': props<{ taskId: number }>(),
    'Undone Task': props<{ taskId: number }>(),
  },
});
export const TasksApiActions = createActionGroup({
  source: 'Tasks API',
  events: {
    'get All': props<{ tasks: ReadonlyArray<Task> }>(),
  },
});
