import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { ClientService } from '../service/client.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsTableComponent } from './clients-table/clients-table.component';

@NgModule({
  imports: [
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    ClientsRoutingModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ClientsTableComponent,
  ],
  exports: [],
  declarations: [ClientsComponent],
  providers: [ClientService],
})
export class ClientsModule {}
