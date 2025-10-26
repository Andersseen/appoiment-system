/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addMinutes, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Users } from '../../../data/users';
import { User } from '../../day-view/day-view-scheduler-calendar.utils';
import { ReplaySubject, Subject, switchMap, takeUntil } from 'rxjs';
import { ColorService } from '../../../service/color.service';
import { EventsService } from '../../../service/events.service';
import { DataService } from '../../../service/data.service';
import { Client, ClientService } from '../../../service/client.service';

type Data = {
  date: Date;
  user: User;
};
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.template.html',
  styles: [
    `
      .toggle-color {
        padding: 0;
        & * {
          width: 100%;
        }
      }
      .hidden-color-list {
        opacity: 0.3;
      }
      .selected-color {
        opacity: 1;
      }
    `,
  ],
})
export class ModalFormComponent implements OnInit, OnDestroy {
  private eventsService = inject(EventsService);
  private colorService = inject(ColorService);
  private dataService = inject(DataService);
  private clientService = inject(ClientService);

  public selectedUser = this.data.user;
  public users = Users;
  public existeClient = false;
  public hideColors = false;
  public filtered: ReplaySubject<any> = new ReplaySubject<any>(1);
  public clients = [];

  public colors = [];

  public ctrl: FormControl<any> = new FormControl<any>(null);
  public search: FormControl<any> = new FormControl<any>(null);

  public eventForm = inject(FormBuilder).group({
    hourFrom: [this.data.date, Validators.required],
    // hourUntil: [this.data.date, Validators.required],
    name: ['', Validators.required],
    lastName: [''],
    color: ['', Validators.required],
    phone: [''],
    email: [''],
    note: [''],
  });

  public titleDate: string;

  protected _onDestroy = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data) {}
  ngOnInit(): void {
    this.colorService.getColors().subscribe((value: any) => {
      value.forEach((element) => {
        const existingColor = this.colors.find(
          (color) => color.element === element
        );

        if (!existingColor) {
          this.colors.push({ ...element, selected: false });
        }
      });
    });
    this.clientService.getClients().subscribe((clients: any) => {
      this.clients = clients;
      // console.log(clients);
    });
    this.clientService.updateClientList();
    this.titleDate = format(this.data.date, 'PPPP', {
      locale: es,
    });

    this.filtered.next(this.clients.slice());

    this.search.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterClients();
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  submitForm() {
    if (this.existeClient) {
      const client = this.ctrl.value;

      const postObjectToAppoiment = {
        title: `${client.name} ${client.lastName}`,
        start: this.eventForm.value.hourFrom.toISOString(),
        end: addMinutes(this.eventForm.value.hourFrom, 15).toISOString(),
        colorId: (this.eventForm.value.color as any).id,
        sectionId: this.selectedUser.id,
        clientId: client.id,
        notes: this.eventForm.value.note,
        draggable: true,
        beforeStart: true,
        afterEnd: true,
      };
      this.eventsService.addAppoiment(postObjectToAppoiment).subscribe(() => {
        this.dataService.updateView();
      });
      return;
    }

    const postObjectToClient: Client = {
      name: this.eventForm.value.name,
      lastName: this.eventForm.value.lastName,
      email: this.eventForm.value.email,
      phone: this.eventForm.value.phone,
      notes: this.eventForm.value.note,
    };
    this.clientService
      .addClient(postObjectToClient)
      .pipe(
        switchMap((client: any) => {
          const postObjectToAppoiment = {
            title: `${client.name} ${client.lastName}`,
            start: this.eventForm.value.hourFrom.toISOString(),
            end: addMinutes(this.eventForm.value.hourFrom, 15).toISOString(),
            colorId: (this.eventForm.value.color as any).id,
            sectionId: this.selectedUser.id,
            clientId: client.id,
            notes: this.eventForm.value.note,
            draggable: true,
            beforeStart: true,
            afterEnd: true,
          };

          return this.eventsService.addAppoiment(postObjectToAppoiment);
        })
      )

      .subscribe(() => {
        this.dataService.updateView();
      });
  }

  protected filterClients() {
    if (!this.clients) {
      return;
    }
    // get the search keyword
    let search = this.search.value;
    if (!search) {
      this.filtered.next(this.clients.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filtered.next(
      this.clients.filter(
        (client) =>
          client.name.toLowerCase().indexOf(search) > -1 ||
          client.lastName.toLowerCase().indexOf(search) > -1 ||
          client.email.toLowerCase().indexOf(search) > -1 ||
          client.phone.toLowerCase().indexOf(search) > -1
      )
    );
  }

  getColor(id: number) {
    this.hideColors = true;
    this.colors.forEach((el) => {
      el.selected = false;
      if (el.id === id) {
        this.eventForm.get('color').setValue(el);
        el.selected = true;
      }
    });
  }
}
