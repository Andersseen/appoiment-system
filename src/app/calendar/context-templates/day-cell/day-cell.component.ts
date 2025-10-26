import { Component, Input, inject } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { Events } from '../../../data/events';
import { User } from '../../day-view/day-view-scheduler-calendar.utils';

@Component({
  selector: 'app-day-cell-template',
  templateUrl: './day-cell.template.html',
})
export class DayCellComponent {
  private dialog = inject(MatDialog);

  @Input() segment;
  @Input() locale;
  @Input() segmentHeight;
  @Input() isTimeLabel;
  @Input() user: User;
  // @Input() refresh: Subject<void>;

  public events: CalendarEvent[] = Events;

  openDialog() {
    this.dialog.open(ModalFormComponent);
  }

  addEvent(date: Date): void {
    this.dialog.open(ModalFormComponent, {
      data: {
        date,
        user: this.user,
        // refresh: this.refresh,
      },
    });
  }
}
