/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CalendarEvent } from 'angular-calendar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import format from 'date-fns/format';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  newEvent;
  oldEvent;
  newUser?: boolean;
}

@Component({
  selector: 'app-confirm-change',
  templateUrl: 'confirm-change.template.html',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class ConfirmChangeComponent {
  public oldEvent: string;
  public newEvent: string;

  @Output() changeEvent = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.oldEvent = format(this.data.oldEvent.start, 'dd/MM/yyyy - HH:mm:ss');
    this.newEvent = format(this.data.newEvent.start, 'dd/MM/yyyy - HH:mm:ss');
  }

  onOkClick(event: CalendarEvent): void {
    this.changeEvent.emit(event ?? this.data.newEvent);
  }
}
