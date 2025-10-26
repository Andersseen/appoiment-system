/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
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
import { ColorService } from '../../service/color.service';
import { EventsService } from '../../service/events.service';
import { DataService } from '../../service/data.service';
import { MatIconModule } from '@angular/material/icon';
import { Client, ClientService } from '../../service/client.service';
import { switchMap } from 'rxjs';
import { addMinutes } from 'date-fns';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.temlate.html',
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
    MatIconModule,
    MatButtonToggleModule,
  ],
  styles: [
    `
      .toggle-color {
        padding: 0;
        & * {
          width: 100%;
        }
      }
      .hidden-color-list {
        opacity: 0.3;
      }
      .selected-color {
        opacity: 1;
      }
    `,
  ],
})
export class ModalEventComponent {
  private colorService = inject(ColorService);
  private eventsService = inject(EventsService);
  private dataService = inject(DataService);
  private clientService = inject(ClientService);

  public editableMode = false;
  public hideColors = false;
  public editEventForm: FormGroup;

  public client: Client = null;

  public colors = [];

  @Output() markEvent = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public event) {
    this.editEventForm = inject(FormBuilder).group({
      name: ['', [Validators.required]],
      lastName: [''],
      color: [''],
      note: [''],
    });

    this.colorService.getColors().subscribe((value: any) => {
      value.forEach((element) => {
        const existingColor = this.colors.find(
          (color) => color.element === element
        );

        if (!existingColor) {
          this.colors.push({ ...element, selected: false });
        }
      });
    });
  }

  editEvent() {
    this.clientService
      .getClientById(Number(this.event.clientId))
      .subscribe((client: Client) => {
        this.getColor(this.event.color.id as number);
        this.client = client;
        this.editEventForm.setValue({
          name: this.client.name,
          lastName: this.client.lastName,
          color: this.event.color.id,
          note: this.event.notes,
        });
        this.editableMode = true;
      });
  }

  removeEvent() {
    this.eventsService
      .removeAppoiment(this.event.id as number)
      .subscribe(() => this.dataService.updateView());
  }

  submitForm() {
    this.clientService
      .editClient(Number(this.event.clientId), {
        name: this.editEventForm.value.name,
        lastName: this.editEventForm.value.lastName,
        email: this.client.email,
        phone: this.client.phone,
        notes: this.client.notes,
      })
      .pipe(
        switchMap((client: Client) => {
          return this.eventsService.editAppoiment(this.event.id as number, {
            ...this.event,
            start: this.event.start.toISOString(),
            end: this.event.end.toISOString(),
            title: `${client.name} ${client.lastName}`,
            colorId: this.editEventForm.value.color,
            notes: this.editEventForm.value.note,
          });
        })
      )
      .subscribe(() => {
        this.dataService.updateView();
      });
  }

  getColor(id: number) {
    this.hideColors = true;
    this.colors.forEach((el) => {
      el.selected = false;
      if (el.id === id) {
        this.editEventForm.get('color').setValue(el.id);
        el.selected = true;
      }
    });
  }

  resetTime() {
    this.eventsService
      .editAppoiment(this.event.id as number, {
        ...this.event,
        start: this.event.start.toISOString(),
        end: addMinutes(new Date(this.event.start as string), 15).toISOString(),
      })
      .subscribe(() => {
        this.dataService.updateView();
      });
  }
}
