import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/interfaces/Task';
import { TasksApiActions } from '../actions/task.actions';

export const initialState: ReadonlyArray<Task> = [];

export const TasksReducer = createReducer(
  initialState,
  on(TasksApiActions.getAll, (_state, { tasks }) => tasks)
);
