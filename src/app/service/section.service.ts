/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

export interface Section {
  id: number;
  name: string;
  order: number;
}

@Injectable()
export class SectionService {
  private http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  private dataUrl = `${APP_CONFIG.apiBack}/sections`;
  //SECTION
  private _sections = new BehaviorSubject(null);

  get sections$() {
    return this._sections.asObservable();
  }

  set sections(value) {
    this._sections.next(value);
  }

  updateSectionList() {
    this.http.get(this.dataUrl).subscribe((value: any) => {
      this.sections = value;
    });
  }

  addSection(newSection: Section) {
    return this.http.post(this.dataUrl, newSection);
  }

  removeSection(id: number): Observable<any> {
    return this.http.delete(`${this.dataUrl}/${id}`);
  }

  editSection(id: number, newSection) {
    return this.http.put(`${this.dataUrl}/${id}`, newSection);
  }
}
