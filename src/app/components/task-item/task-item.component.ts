import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { ParticipantComponent } from '../participant/participant.component';

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
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  panelOpenState = false;
}
