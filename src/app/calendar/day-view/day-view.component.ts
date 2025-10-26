/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarWeekViewComponent,
  DateAdapter,
  getWeekViewPeriod,
} from 'angular-calendar';
import {
  WeekViewTimeEvent,
  CalendarEvent,
  WeekViewAllDayEvent,
} from 'calendar-utils';
import { DragEndEvent, DragMoveEvent } from 'angular-draggable-droppable';
import { CustomDateFormatter } from '../custom-date-formatter.provider';
import { registerLocaleData } from '@angular/common';
import {
  DayViewScheduler,
  DayViewSchedulerCalendarUtils,
  User,
} from './day-view-scheduler-calendar.utils';
import { MarkService } from '../../service/mark.service';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  catchError,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-day-view',
  templateUrl: 'day-view.template.html',
  styleUrls: ['./day-view.styles.scss'],
  providers: [
    DayViewSchedulerCalendarUtils,
    MarkService,
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
  // styles: [
  //   `
  //     .started_mark {
  //       text-decoration-line: underline;
  //       text-decoration-thickness: 5px;
  //       color: red;
  //     }
  //   `,
  // ],
})
export class DayViewComponent
  extends CalendarWeekViewComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() set users(value) {
    if (!value) return;
    this.sections = [...value.map((item) => ({ ...item, mark: false }))];
  }
  @Output() userChanged = new EventEmitter();

  public view: DayViewScheduler | any;
  public sections = [];
  public daysInWeek = 1;

  private viewDateSubject = new BehaviorSubject(null);
  public viewDateValue$: Observable<any>;

  private isDestroyed$: Subject<void> = new Subject<void>();
  private markService = inject(MarkService);

  constructor(
    protected cdr: ChangeDetectorRef,
    protected utils: DayViewSchedulerCalendarUtils,
    @Inject(LOCALE_ID) locale: string,
    protected dateAdapter: DateAdapter,
    protected element: ElementRef<HTMLElement>
  ) {
    registerLocaleData(locale);
    super(cdr, utils, locale, dateAdapter, element);
    this.viewDateValue$ = this.viewDateSubject
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  trackByUserId = (index: number, row: User) => row.id;

  ngOnInit(): void {
    this.viewDateValue$
      .pipe(
        takeUntil(this.isDestroyed$),
        switchMap((viewDateValue: any) => {
          return this.markService.getMark(viewDateValue.toISOString()).pipe(
            filter((x) => x !== null),
            catchError(() => {
              for (const item of this.sections) {
                item.mark = false;
              }
              return EMPTY;
            }),
            switchMap((value: string) => {
              if (value === '[]')
                return this.markService.removeMark(viewDateValue.toISOString());
              const listOdMarks = JSON.parse(value);
              for (const item of this.sections) {
                item.mark = false;
                for (const el of listOdMarks) {
                  if (item.id === el.id) item.mark = el.mark;
                }
              }
              return EMPTY;
            })
          );
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.viewDate) this.viewDateSubject.next(this.viewDate);

    super.ngOnChanges(changes);

    if (changes.sections) {
      this.refreshBody();
      this.emitBeforeViewRender();
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }

  getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.sections.length);
  }

  dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent) {
    if (this.snapDraggedEvents) {
      const newUser = this.getDraggedUserColumn(dayEvent, dragEvent.x);
      const newEventTimes = this.getDragMovedEventTimes(
        dayEvent,
        { ...dragEvent, x: 0 },
        this.dayColumnWidth,
        true
      );
      const originalEvent = dayEvent.event;
      const adjustedEvent = {
        ...originalEvent,
        ...newEventTimes,
        meta: { ...originalEvent.meta, user: newUser },
      };
      const tempEvents = this.events.map((event) => {
        if (event === originalEvent) {
          return adjustedEvent;
        }
        return event;
      });
      this.restoreOriginalEvents(
        tempEvents,
        new Map([[adjustedEvent, originalEvent]])
      );
    }
    this.dragAlreadyMoved = true;
  }

  dragEnded(
    weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent | any,
    dragEndEvent: DragEndEvent,
    dayWidth: number,
    useY = false
  ) {
    super.dragEnded(
      weekEvent,
      {
        ...dragEndEvent,
        x: 0,
      },
      dayWidth,
      useY
    );

    const newUser = this.getDraggedUserColumn(weekEvent, dragEndEvent.x);

    if (newUser && newUser !== weekEvent.event.meta.user) {
      this.userChanged.emit({
        event: weekEvent.event,
        newStart: weekEvent.tempEvent.start,
        newEnd: weekEvent.tempEvent.end,
        newUser,
      });
    }
  }

  protected getWeekView(events: CalendarEvent[]) {
    return this.utils.getWeekView({
      events,
      users: this.sections.sort((a, b) => a.order - b.order),
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true,
      hourSegments: this.hourSegments,
      hourDuration: this.hourDuration,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute,
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute,
      },
      segmentHeight: this.hourSegmentHeight,
      weekendDays: this.weekendDays,
      ...getWeekViewPeriod(
        this.dateAdapter,
        this.viewDate,
        this.weekStartsOn,
        this.excludeDays,
        this.daysInWeek
      ),
    });
  }

  private getDraggedUserColumn(
    dayEvent: WeekViewTimeEvent | WeekViewAllDayEvent,
    xPixels: number
  ) {
    const columnsMoved = Math.round(xPixels / this.dayColumnWidth);
    const currentColumnIndex = this.view.users.findIndex((user) => {
      return user.id === dayEvent.event.meta.user.id;
    });
    const newIndex = currentColumnIndex + columnsMoved;

    return this.view.users[newIndex];
  }

  markSection(section) {
    const findSection = this.sections.find((item) => item.id === section.id);
    findSection.mark = !findSection.mark;
    const markedSections = this.sections.filter((item) => item.mark);
    const markObject = {
      key: this.viewDate.toISOString(),
      value: JSON.stringify(markedSections),
    };
    this.markService.addMark(markObject).subscribe();
  }
}
