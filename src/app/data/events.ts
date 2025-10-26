import { CalendarEvent } from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';
import { Users } from './users';
import { Colors } from './colors';

export const Events: CalendarEvent[] = [
  {
    title: 'Cita',
    color: Colors.red,
    start: addHours(startOfDay(new Date()), 10),
    meta: {
      user: Users[0],
    },
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    draggable: true,
  },
  {
    title: 'Evento',
    color: Colors.yellow,
    start: addHours(startOfDay(new Date()), 15),
    meta: {
      user: Users[1],
    },
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    draggable: true,
  },
  {
    title: 'Algo',
    color: Colors.green,
    start: addHours(startOfDay(new Date()), 18),
    meta: {
      user: Users[0],
    },
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    draggable: true,
  },
];
