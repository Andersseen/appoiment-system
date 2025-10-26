import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  public refresh = new Subject<void>();
  private _hideDateToggle = new BehaviorSubject(false);

  get hideDateToggle$() {
    return this._hideDateToggle.asObservable();
  }
  set hideDateToggle(value: boolean) {
    this._hideDateToggle.next(value);
  }

  updateView() {
    this.refresh.next();
  }

  get refresh$() {
    return this.refresh.asObservable();
  }
}
