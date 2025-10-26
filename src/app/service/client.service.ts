/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

export interface Client {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

@Injectable()
export class ClientService {
  private http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  private dataUrl = `${APP_CONFIG.apiBack}/clients`;
  //CLIENT
  private _clients = new BehaviorSubject(null);

  get clients$() {
    return this._clients.asObservable();
  }

  set clients(value) {
    this._clients.next(value);
  }

  getClients() {
    return this.http.get(this.dataUrl);
  }
  getClientById(id: number) {
    return this.http.get(`${this.dataUrl}/${id}`);
  }

  updateClientList() {
    this.getClients().subscribe((value: any) => {
      this.clients = value;
    });
  }

  addClient(newClient: Client) {
    return this.http.post(this.dataUrl, newClient);
  }

  removeClient(id: number): Observable<any> {
    return this.http.delete(`${this.dataUrl}/${id}`);
  }

  editClient(id: number, updateClient: Client) {
    return this.http.put(`${this.dataUrl}/${id}`, updateClient);
  }
}
