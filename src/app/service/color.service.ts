/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

export interface Color {
  name: string;
  primary: string;
  secondary: string;
  secondaryText: string;
}

@Injectable()
export class ColorService {
  private http = inject(HttpClient);

  private dataUrl = `${APP_CONFIG.apiBack}/colors`;
  //COLORS
  private _colors = new BehaviorSubject(null);

  get colors$() {
    return this._colors.asObservable();
  }

  set colors(value) {
    this._colors.next(value);
  }

  getColors() {
    return this.http.get(this.dataUrl);
  }

  updateColorList() {
    this.http.get(this.dataUrl).subscribe((value: any) => {
      this.colors = value;
    });
  }

  addColor(newColor: Color) {
    return this.http.post(this.dataUrl, newColor);
  }

  removeColor(id: number): Observable<any> {
    return this.http.delete(`${this.dataUrl}/${id}`);
  }

  editColor(id: number, editColor) {
    return this.http.put(`${this.dataUrl}/${id}`, editColor);
  }
}
