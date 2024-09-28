import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { ParticipantComponent } from '../participant/participant.component';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { PostgresRepositoryService } from 'src/app/repositories/postgres-repository.service';
import { Task } from 'src/app/interfaces/Task';
import { finalize } from 'rxjs';
import { Store } from '@ngrx/store';
import { TasksActions } from 'src/app/state/actions/task.actions';

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    ParticipantComponent,
    MatRippleModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css'],
})
export class CreateTaskModalComponent {
  isSaving = false;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  isAddingPerson = false;

  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    persons: new FormArray<FormGroup>([]),
  });

  addPersonForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    age: new FormControl(null, [Validators.required, Validators.min(19)]),
    skills: new FormArray<FormControl>([], Validators.minLength(1)),
  });

  constructor(
    private taskRepository: PostgresRepositoryService,
    private dialogRef: MatDialogRef<CreateTaskModalComponent>,
    private store: Store,
    private snackbar: MatSnackBar
  ) {}
  addPerson() {
    this.isAddingPerson = true;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      (this.addPersonForm.get('skills') as FormArray).push(
        new FormControl(value)
      );
    }
    event.chipInput!.clear();
  }

  remove(skillIndex: number): void {
    (this.addPersonForm.get('skills') as FormArray).removeAt(skillIndex);
  }
  deletePerson(personIndex: number) {
    this.personsForm.removeAt(personIndex);
  }
  savePerson() {
    if (this.addPersonForm.invalid)
      return this.addPersonForm.markAllAsTouched();
    if (this.addPersonForm.get('skills')!.value.length < 1)
      return this.snackbar.open('Debe ingresar almenos una habilidad', 'ok', {
        duration: 5000,
      });
    this.personsForm.push(
      new FormGroup({
        name: new FormControl(this.addPersonForm.get('name')?.value),
        age: new FormControl(this.addPersonForm.get('age')?.value),
        skills: new FormArray<FormControl>(
          (this.addPersonForm.get('skills') as FormArray)
            ?.controls as FormControl[]
        ),
      })
    );
    (this.addPersonForm.get('skills') as FormArray<FormControl>)?.clear();
    this.addPersonForm.reset();
    this.isAddingPerson = false;
  }

  createTask() {
    if (this.taskForm.invalid) return this.taskForm.markAllAsTouched();
    this.isSaving = true;
    this.taskRepository
      .create({ ...this.taskForm.value } as Partial<Task>)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe((id) => {
        this.store.dispatch(
          TasksActions.addTask({
            task: {
              ...this.taskForm.value,
              id: Number(id),
              completed: false,
            } as Task,
          })
        );
        this.dialogRef.close();
      });
  }

  get personsForm() {
    return this.taskForm.get('persons') as FormArray<FormGroup>;
  }
}
