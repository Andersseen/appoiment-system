/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Injectable } from '@angular/core';
import { CalendarEventTitleFormatter } from 'angular-calendar';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor() {
    super();
  }

  week(event): string {
    // Determina si se debe usar <strong> o <span>
    const titleTag = event.started ? 'strong' : 'span';

    // Reemplaza los saltos de línea en event.notes con <br/>
    const formattedNotes = event.notes.replace(/\n/g, '<br/>');

    // Retorna el HTML formateado
    return `<${titleTag}>${event.title}</${titleTag}>
            <small>${formattedNotes}</small>`;
  }
}
