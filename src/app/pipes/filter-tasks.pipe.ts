import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/Task';

@Pipe({
  name: 'filterTasks',
  standalone: true,
})
export class FilterTasksPipe implements PipeTransform {
  transform(value: Task[], filter: 'ALL' | 'PENDING' | 'COMPLETED'): Task[] {
    switch (filter) {
      case 'PENDING':
        return value.filter(({ completed }) => !completed);
      case 'COMPLETED':
        return value.filter(({ completed }) => completed);
      case 'ALL':
        return value;
    }
  }
}
