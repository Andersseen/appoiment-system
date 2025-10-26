import { Injectable } from '@angular/core';
import { CalendarUtils } from 'angular-calendar';
import { WeekView, WeekViewHourColumn, GetWeekViewArgs } from 'calendar-utils';

export interface User {
  id: number;
  name: string;
  mark?: boolean;
}

export interface DayViewScheduler extends WeekView {
  users: User[];
  customHourColumns: CustomWeekViewHourColumn[];
}
export interface CustomWeekViewHourColumn extends WeekViewHourColumn {
  user: User;
}

export interface GetWeekViewArgsWithUsers extends GetWeekViewArgs {
  users: User[];
}

@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {
  getWeekView(args: GetWeekViewArgsWithUsers): DayViewScheduler {
    const { period } = super.getWeekView(args);

    const view: DayViewScheduler = {
      period,
      allDayEventRows: [],
      hourColumns: [],
      users: [...args.users],
      customHourColumns: [],
    };

    view.users.forEach((user, columnIndex) => {
      const events = args.events.filter((event) => {
        return event.meta.user.id === user.id;
      });

      const columnView = super.getWeekView({
        ...args,
        events,
      });

      view.hourColumns.push(columnView.hourColumns[0]);
      view.customHourColumns.push({ user, ...columnView.hourColumns[0] });
      // console.log(view.customHourColumns);

      columnView.allDayEventRows.forEach(({ row }, rowIndex) => {
        view.allDayEventRows[rowIndex] = view.allDayEventRows[rowIndex] || {
          row: [],
        };
        view.allDayEventRows[rowIndex].row.push({
          ...row[0],
          offset: columnIndex,
          span: 1,
        });
      });
    });

    return view;
  }
}
