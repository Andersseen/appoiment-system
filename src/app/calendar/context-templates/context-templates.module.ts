import { NgModule } from '@angular/core';
import { MonthCellComponent } from './month-cell/month-cell.component';
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { WeekCellComponent } from './week-cell/week-cell.component';
import { DayCellComponent } from './day-cell/day-cell.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {
  MAT_SELECTSEARCH_DEFAULT_OPTIONS,
  MatSelectSearchOptions,
} from 'ngx-mat-select-search';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule,
    CalendarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonToggleModule,
    ContextMenuModule,
    NgxMatSelectSearchModule,
  ],
  exports: [MonthCellComponent, DayCellComponent, WeekCellComponent],
  declarations: [
    MonthCellComponent,
    DayCellComponent,
    WeekCellComponent,
    ModalFormComponent,
  ],
  providers: [
    {
      provide: MAT_SELECTSEARCH_DEFAULT_OPTIONS,
      useValue: <MatSelectSearchOptions>{
        noEntriesFoundLabel: 'Cliente no encontrado',
        placeholderLabel: 'Escribe datos de cliente',
      },
    },
  ],
})
export class ContextTemplatesModule {}
