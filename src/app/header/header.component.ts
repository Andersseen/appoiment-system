import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { HeadCalendarService } from '../service/head-calendar.service';
import { FormBuilder } from '@angular/forms';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Subject, filter, takeUntil } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.template.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() hideDateToggle = false;

  @Output() openSideMenu = new EventEmitter<void>();

  private headCalendarService = inject(HeadCalendarService);
  private router = inject(Router);

  private unsubscribe$ = new Subject<void>();

  public view: CalendarView = CalendarView.Month;
  @Input() isOpenSideMenu = false;
  @Output() isOpenSideMenuChange = new EventEmitter();

  public viewDate: Date = new Date();

  public get titleDate() {
    return format(this.viewDate, 'PPPP', {
      locale: es,
    });
  }

  public locale = 'es';
  public headerTitle: string;

  public templateForm = inject(FormBuilder).group({
    date: ['today'],
    view: [this.view],
  });

  ngOnInit(): void {
    this.headCalendarService.viewChanges$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val: CalendarView) => {
        this.view = val;
        this.templateForm.get('view').setValue(val);
      });
    this.headCalendarService.viewDate$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((viewDate) => {
        this.viewDate = viewDate ?? new Date();
      });
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((event: any) => event instanceof NavigationEnd)
      )
      .subscribe((elem) => {
        this.headerTitle = elem.url;
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  viewChangeInCalendar(value: string) {
    const correctValue = value as CalendarView;

    this.view = correctValue;
    this.headCalendarService.setViewChanges(correctValue);
  }
  changeDateInCalendar(value: Date) {
    this.headCalendarService.setViewDate(value);
  }

  handleSideMenu() {
    this.isOpenSideMenu = !this.isOpenSideMenu;
    this.isOpenSideMenuChange.emit(this.isOpenSideMenu);
    this.openSideMenu.emit();
  }
}
