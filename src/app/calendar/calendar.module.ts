import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'angular-calendar';
import { registerLocaleData } from '@angular/common';
import { DayViewComponent } from './day-view/day-view.component';
import { ContextTemplatesModule } from './context-templates/context-templates.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MatExpansionModule } from '@angular/material/expansion';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { EventsService } from '../service/events.service';
import flatpickr from 'flatpickr';
import localeEs from '@angular/common/locales/es';
import { MatButtonModule } from '@angular/material/button';
import { SectionService } from '../service/section.service';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { MatListModule } from '@angular/material/list';
import { ExternalEventsComponent } from './external-events/external-events.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { ColorService } from '../service/color.service';
import { ClientService } from '../service/client.service';
// import { EditSectionsComponent } from './edit-sections/edit-sections.component';
// import { KitchenComponent } from './kitchen/kitchen.component';

registerLocaleData(localeEs);

export function flatpickrFactory() {
  flatpickr.localize(Spanish);
  return flatpickr;
}

@NgModule({
  declarations: [
    CalendarComponent,
    DayViewComponent,
    // KitchenComponent,
    ExternalEventsComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    DragAndDropModule,
    CalendarRoutingModule,
    ContextTemplatesModule,
    MatMenuModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    // EditSectionsComponent,
    FlatpickrModule.forRoot(),
    CalendarModule,
  ],
  providers: [
    EventsService,
    SectionService,
    ColorService,
    ClientService,
    { provide: LOCALE_ID, useValue: 'es-ES' },
  ],
})
export class CalendarMainModule {}
