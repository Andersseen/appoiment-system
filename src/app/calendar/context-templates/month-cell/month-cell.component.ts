import { Component, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { Events } from '../../../data/events';

@Component({
  selector: 'app-month-cell-template',
  templateUrl: './month-cell.template.html',
})
export class MonthCellComponent {
  @Input() day;
  @Input() openDay;
  @Input() locale;
  @Input() tooltipPlacement;
  @Input() highlightDay;
  @Input() unhighlightDay;
  @Input() eventClicked;

  public events: CalendarEvent[] = Events;

  public refresh = new Subject<void>();
  addEvent(date: Date): void {
    console.log(date);
    console.log(this.day);
    // console.log(this.openDay);
    // console.log(this.locale);
    // console.log(this.tooltipPlacement);
    console.log(this.highlightDay);
    console.log(this.unhighlightDay);
    console.log(this.eventClicked);

    // this.events.push({
    //   start: date,
    //   title: 'New event',
    //   color: colors.red,
    // });
    // this.refresh.next();
  }
}
