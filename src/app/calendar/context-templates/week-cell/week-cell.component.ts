import { Component, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { Events } from '../../../data/events';

@Component({
  selector: 'app-week-cell-template',
  templateUrl: './week-cell.template.html',
})
export class WeekCellComponent {
  @Input() segment;
  @Input() segmentHeight;
  @Input() locale;
  @Input() isTimeLabel;

  public events: CalendarEvent[] = Events;

  public refresh = new Subject<void>();
  addEvent(date: Date): void {
    console.log(date);
    console.log(this.segment);

    // this.events.push({
    //   start: date,
    //   title: 'New event',
    //   color: colors.red,
    // });
    // this.refresh.next();
  }
}
