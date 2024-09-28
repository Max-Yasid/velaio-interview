import { Person } from './Person';

export interface Task {
  id: number;
  date: string;
  name: string;
  completed: boolean;
  persons: Person[];
}
