/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, OnInit, inject } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { filter, switchMap, takeUntil } from 'rxjs';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { HeadCalendarService } from '../service/head-calendar.service';
import { EventsService } from '../service/events.service';
import { SectionService } from '../service/section.service';
import { DataService } from '../service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventComponent } from './modal-event/modal-event.component';
import { BaseComponent } from '../shared/components';
import { ConfirmChangeComponent } from './confirm-change/confirm-change.component';
import { CustomEventTitleFormatter } from './day-view/custom-event-title-formatter.provider';
import { addMinutes } from 'date-fns';

export interface ExternalCalendarEvent extends CalendarEvent {
  duringEvent: number;
}
export interface ExternalCalendarEventTimesChangedEvent
  extends CalendarEventTimesChangedEvent {
  event: ExternalCalendarEvent;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class CalendarComponent extends BaseComponent implements OnInit {
  private headCalendarService = inject(HeadCalendarService);
  private eventsService = inject(EventsService);
  private dataService = inject(DataService);
  private sectionService = inject(SectionService);
  private dialog = inject(MatDialog);

  public view: CalendarView = CalendarView.Month;

  public viewDate: Date = new Date();
  public externalEvents: ExternalCalendarEvent[] = [];

  public locale = 'es';
  public users$ = this.sectionService.sections$;

  public events: CalendarEvent[] = [];

  public refresh = this.dataService.refresh;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY];
  excludeDays: number[] = [DAYS_OF_WEEK.SUNDAY];

  ngOnInit(): void {
    this.dataService.refresh$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(() => {
        this.eventsService.getEventList().subscribe((list: any) => {
          this.events = list;
        });
      });
    this.sectionService.updateSectionList();
    this.eventsService.getEventList().subscribe((list: any) => {
      this.events = list;
    });

    this.headCalendarService.viewChanges$
      .pipe(filter((x) => x !== null))
      .subscribe((val: CalendarView) => (this.view = val));
    this.headCalendarService.viewDate$
      .pipe(filter((x) => x !== null))
      .subscribe((val: Date) => (this.viewDate = val));
  }

  dayClicked(event: any): void {
    this.view = CalendarView.Day;
    this.viewDate = event.day.date;
    this.headCalendarService.setViewChanges(this.view);
    this.headCalendarService.setViewDate(this.viewDate);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
    type,
  }: CalendarEventTimesChangedEvent): void {
    if (type === 'drag') return;
    this.eventsService
      .editAppoiment(event.id as number, {
        ...event,
        start: newStart.toISOString(),
        end: newEnd.toISOString(),
      })
      .subscribe(() => {
        this.dataService.updateView();
      });
  }
  dragedEventTimesChanged({ event, newStart, newEnd }): void {
    const newEvent = {
      ...event,
      start: newStart,
      end: newEnd ?? event.end,
    };

    const dialogRef = this.dialog.open(ConfirmChangeComponent, {
      data: {
        oldEvent: event,
        newEvent,
      },
    });
    dialogRef.componentRef.instance.changeEvent
      .pipe(
        takeUntil(this.isDestroyed$),
        switchMap((data: CalendarEvent) => {
          if (JSON.stringify(event) === JSON.stringify(data)) return;

          const externalIndex = this.externalEvents.indexOf(event);
          if (externalIndex > -1) {
            this.externalEvents.splice(externalIndex, 1);
          }
          return this.eventsService.editAppoiment(event.id as number, {
            ...event,
            start: newStart.toISOString(),
            end: newEnd.toISOString() ?? addMinutes(newStart, 15).toISOString(),
          });
        })
      )
      .subscribe(() => {
        this.dataService.updateView();
      });

    // this.events = [...this.events];
  }

  userChanged({ event, newStart, newEnd, newUser }) {
    const newEvent = {
      ...event,
      start: newStart,
      end: newEnd ?? event.end,
      section: newUser,
      sectionId: newUser.id,
    };
    // this.events = [...this.events];
    const dialogRef = this.dialog.open(ConfirmChangeComponent, {
      data: {
        oldEvent: event,
        newEvent,
        newUser: true,
      },
    });

    dialogRef.componentRef.instance.changeEvent
      .pipe(
        takeUntil(this.isDestroyed$),
        switchMap((data: CalendarEvent) => {
          if (JSON.stringify(event) === JSON.stringify(data)) return;
          return this.eventsService.editAppoiment(event.id as number, {
            ...event,
            start: newStart.toISOString(),
            end: newEnd.toISOString() ?? addMinutes(newStart, 15).toISOString(),
            sectionId: newUser.id,
          });
        })
      )
      .subscribe(() => {
        this.dataService.updateView();
      });
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    const dialogRef = this.dialog.open(ModalEventComponent, {
      data: event,
    });

    dialogRef.componentRef.instance.markEvent
      .pipe(
        takeUntil(this.isDestroyed$),
        switchMap((event) => {
          if (event.started)
            return this.eventsService.editAppoiment(event.id as number, {
              ...event,
              started: false,
            });
          return this.eventsService.editAppoiment(event.id as number, {
            ...event,
            started: true,
          });
        })
      )
      .subscribe(() => {
        this.dataService.updateView();
        dialogRef.close();
      });
  }

  ///==================External Events

  eventDropped({ event, newStart, newEnd, type }: any): void {
    if (type === 'resize') {
      this.eventTimesChanged({
        event,
        newStart,
        newEnd,
      } as any);
      return;
    }

    const duringEvent = event.duringEvent;

    let newEndExternal = null;
    if (duringEvent)
      newEndExternal = new Date(newStart.getTime() + event.duringEvent);

    delete event['duringEvent'];

    this.dragedEventTimesChanged({
      event,
      newStart,
      newEnd: newEndExternal ?? newEnd,
    } as any);
  }
  //======week toggle
  inWeekMoveEvent(openedDrawer: boolean) {
    this.dataService.hideDateToggle = openedDrawer;
  }
}
