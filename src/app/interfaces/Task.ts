import { Person } from './Person';

export interface Task {
  id: number;
  age: number;
  name: string;
  completed: boolean;
  persons: Person[];
}
