/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../environments/environment';

@Injectable()
export class MarkService {
  private http = inject(HttpClient);
  private dataUrl = `${APP_CONFIG.apiBack}/marks`;

  getAllMarks() {
    return this.http.get(this.dataUrl);
  }
  getMark(key) {
    return this.http.get(`${this.dataUrl}/${key}`);
  }
  addMark(newMark) {
    return this.http.post(this.dataUrl, newMark);
  }

  removeMark(key): Observable<any> {
    return this.http.delete(`${this.dataUrl}/${key}`);
  }
}
