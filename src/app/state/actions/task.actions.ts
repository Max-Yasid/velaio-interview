import { createActionGroup, props } from '@ngrx/store';
import { Task } from 'src/app/interfaces/Task';

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    'set All': props<{ tasks: ReadonlyArray<Task> }>(),
    'Add task': props<{ task: Task }>(),
    'Remove Task': props<{ taskId: number }>(),
    'Complete Task': props<{ taskId: number }>(),
    'Undone Task': props<{ taskId: number }>(),
  },
});
