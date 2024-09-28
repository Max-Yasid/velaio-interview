import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { PostgresRepositoryService } from './repositories/postgres-repository.service';
import { Store } from '@ngrx/store';
import {
  selectTaskCollection,
  selectTasks,
} from './state/selectors/task.selector';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';
import { Observable } from 'rxjs';
import { Task } from './interfaces/Task';
import { TasksActions } from './state/actions/task.actions';

const enum Filters {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    TaskItemComponent,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    FilterTasksPipe,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'velaio-interview';
  selectedFilter: 'ALL' | 'COMPLETED' | 'PENDING' = Filters.ALL;

  tasks$ = this.store.select(selectTasks);

  constructor(
    private dialog: MatDialog,
    private tasksRepository: PostgresRepositoryService,
    private store: Store
  ) {
    this.tasksRepository.getAll().subscribe((tasks) => {
      this.store.dispatch(TasksActions.setAll({ tasks }));
    });
  }
  openCreateTaskModal() {
    this.dialog
      .open(CreateTaskModalComponent)
      .afterClosed()
      .subscribe((wasCreated) => {});
  }

  selectFilter(filter: 'ALL' | 'COMPLETED' | 'PENDING') {
    this.selectedFilter = filter;
  }
}
