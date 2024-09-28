import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { ParticipantComponent } from '../participant/participant.component';
import { Task } from 'src/app/interfaces/Task';
import { PostgresRepositoryService } from 'src/app/repositories/postgres-repository.service';
import { Store } from '@ngrx/store';
import { TasksActions } from 'src/app/state/actions/task.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatRippleModule,
    MatExpansionModule,
    MatDividerModule,
    ParticipantComponent,
    MatButtonModule,
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  panelOpenState = false;
  @Input() task!: Task;

  constructor(
    private tasksRepository: PostgresRepositoryService,
    private store: Store
  ) {}

  changeTaskStatus(id: number, { checked }: MatCheckboxChange) {
    this.tasksRepository.changeStatus(id, checked).subscribe();
    if (checked) this.store.dispatch(TasksActions.completeTask({ taskId: id }));
    else this.store.dispatch(TasksActions.undoneTask({ taskId: id }));
  }
  deleteTask(e: Event, taskId: number) {
    e.stopPropagation();
    this.store.dispatch(TasksActions.removeTask({ taskId }));
    this.tasksRepository.delete(taskId).subscribe();
  }
}
