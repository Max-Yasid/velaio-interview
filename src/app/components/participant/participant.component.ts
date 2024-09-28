import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Person } from 'src/app/interfaces/Person';

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css'],
})
export class ParticipantComponent implements OnInit {
  ngOnInit(): void {}
  @Input() person!: Person;
}
