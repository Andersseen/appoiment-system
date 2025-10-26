/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Client, ClientService } from '../service/client.service';
import { filter, finalize, switchMap, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditClientComponent } from './edit-client/edit-client.component';
import { BaseComponent } from '../shared/components';

@Component({
  selector: 'app-clients-name',
  templateUrl: './clients.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent extends BaseComponent implements OnInit {
  private clientService = inject(ClientService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  public loading = false;

  public clients$ = this.clientService.clients$;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.clientService.updateClientList();
  }

  removeData(item) {
    this.clientService
      .removeClient(item.id as number)
      .pipe(finalize(() => this.cdr.markForCheck()))
      .subscribe(() => this.clientService.updateClientList());
  }

  editData(client): void {
    const dialogRef = this.dialog.open(EditClientComponent, {
      data: client,
    });

    dialogRef.componentRef.instance.showEvents
      .pipe(
        takeUntil(this.isDestroyed$),
        finalize(() => this.cdr.markForCheck()),
        switchMap(() => {
          return this.clientService.getClientById(client.id as number);
        })
      )
      .subscribe((data: any) =>
        dialogRef.componentRef.setInput('events', data.events)
      );

    dialogRef.componentRef.instance.editClient
      .pipe(
        takeUntil(this.isDestroyed$),
        filter((x) => x !== null),
        finalize(() => this.cdr.markForCheck()),
        switchMap((data) => {
          if (!data) return;
          return this.clientService.editClient(
            client.id as number,
            data as Client
          );
        })
      )
      .subscribe(() => {
        this.clientService.updateClientList();
        dialogRef.close();
      });
  }
}
