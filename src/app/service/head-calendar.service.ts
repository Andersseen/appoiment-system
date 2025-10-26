import { Injectable } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeadCalendarService {
  private _viewChanges: BehaviorSubject<CalendarView> =
    new BehaviorSubject<CalendarView>(CalendarView.Month);
  private _viewDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);

  setViewChanges(value: CalendarView) {
    this._viewChanges.next(value);
  }

  get viewChanges$(): Observable<string> {
    return this._viewChanges.asObservable();
  }

  setViewDate(value: Date) {
    this._viewDate.next(value);
  }

  get viewDate$(): Observable<Date> {
    return this._viewDate.asObservable();
  }
}
