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
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'velaio-interview';
  constructor(private dialog: MatDialog) {}
  openCreateTaskModal() {
    this.dialog
      .open(CreateTaskModalComponent)
      .afterClosed()
      .subscribe((wasCreated) => {});
  }
}
