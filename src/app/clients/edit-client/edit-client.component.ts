/* eslint-disable @typescript-eslint/unbound-method */
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.temlate.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export class EditClientComponent {
  public editableMode = false;
  public hideColors = false;
  public editClientForm: FormGroup;

  @Input() events = null;

  @Output() showEvents = new EventEmitter<void>();
  @Output() editClient = new EventEmitter<any>();

  public colors = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public client,
    private dialogRef: MatDialogRef<EditClientComponent>
  ) {
    this.editClientForm = inject(FormBuilder).group({
      name: [this.client.name, [Validators.required]],
      lastName: [this.client.lastName],
      email: [this.client.email],
      phone: [this.client.phone],
      notes: [this.client.notes],
    });
  }

  showEventsOfClient() {
    this.showEvents.emit();
  }

  editData() {
    this.editClient.emit(this.editClientForm.value);
  }
}
