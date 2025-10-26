/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../environments/environment';

type Appoiment = {
  hourFrom: Date;
  hourUntil: Date;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  color: string;
};

@Injectable()
export class EventsService {
  private http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  private dataUrl = `${APP_CONFIG.apiBack}/events`;
  //SECTION
  private _events = new BehaviorSubject(null);
  sections: any;

  get events$() {
    return this._events.asObservable();
  }

  set events(value) {
    this._events.next(value);
  }

  updateAppoimentList() {
    this.http.get(this.dataUrl).subscribe((value: any) => {
      this.sections = value;
    });
  }
  getEventList() {
    return this.http.get(this.dataUrl).pipe(
      map((list: any[]) => {
        return list.map((item) => ({
          ...item,
          start: new Date(item.start as string),
          meta: {
            user: item.section,
          },
          resizable: {
            beforeStart: item.beforeStart,
            afterEnd: item.afterEnd,
          },
          end: item.end ? new Date(item.end as string) : null,
        }));
      })
    );
  }

  addAppoiment(newAppoiment) {
    return this.http.post(this.dataUrl, newAppoiment);
  }

  removeAppoiment(id: number): Observable<any> {
    return this.http.delete(`${this.dataUrl}/${id}`);
  }

  editAppoiment(id: number, body) {
    return this.http.put(`${this.dataUrl}/${id}`, body);
  }
}
