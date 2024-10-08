import { createReducer, on } from '@ngrx/store';
import { TasksActions } from '../actions/task.actions';
import { Task } from 'src/app/interfaces/Task';

export const initialState: ReadonlyArray<Task> = [];

export const TaskReducer = createReducer(
  initialState,
  on(TasksActions.removeTask, (state, { taskId }) =>
    state.filter(({ id }) => id !== taskId)
  ),
  on(TasksActions.addTask, (state, { task }) => {
    const findedTask = state.find(({ id }) => id === task.id);
    findedTask;
    if (findedTask) return state;
    return [...state, task];
  }),
  on(TasksActions.completeTask, (state, { taskId }) => {
    const stateCloned = structuredClone(state);
    let taskIndex = stateCloned.findIndex(({ id }) => id === taskId);
    if (taskIndex > -1) {
      stateCloned[taskIndex].completed = true;
      console.log(stateCloned);
      return stateCloned;
    }
    return state;
  }),
  on(TasksActions.undoneTask, (state, { taskId }) => {
    const stateCloned = structuredClone(state);
    let taskIndex = stateCloned.findIndex(({ id }) => id === taskId);
    if (taskIndex > -1) {
      stateCloned[taskIndex].completed = false;
      console.log(stateCloned);
      return stateCloned;
    }
    return state;
  }),
  on(TasksActions.setAll, (state, { tasks }) => {
    return tasks;
  })
);
