import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Task } from 'src/app/interfaces/Task';

export const selectTasks = createFeatureSelector<Array<Task>>('tasks');

export const selectCollectionState =
  createFeatureSelector<Array<number>>('collection');

export const selectTaskCollection = createSelector(
  selectTasks,
  selectCollectionState,
  (tasks, collection) => {
    return collection.map((id) => tasks.find((task) => task.id === id)!);
  }
);
