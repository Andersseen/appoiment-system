import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExternalCalendarEvent } from '../calendar.component';

@Component({
  selector: 'app-external-events',
  templateUrl: 'external-events.template.html',
  styles: [
    `
      .drag-active {
        position: relative;
        z-index: 1;
        pointer-events: none;
      }
      .drag-over {
        background-color: #eee;
      }
    `,
  ],
})
export class ExternalEventsComponent {
  @Input() externalEvents;
  @Input() events;

  //   @Output() externalEventsChange = new EventEmitter();
  @Output() eventsChange = new EventEmitter();
  @Output() externalEventsChange = new EventEmitter();
  externalDrop(event: ExternalCalendarEvent) {
    const timeDifference = event.end.getTime() - event.start.getTime();

    if (this.externalEvents.indexOf(event) === -1) {
      this.eventsChange.emit(
        (this.events = this.events.filter((iEvent) => iEvent !== event))
      );
      this.externalEvents.push({ ...event, duringEvent: timeDifference });
      this.externalEventsChange.emit(this.externalEvents);
    }
  }
}
