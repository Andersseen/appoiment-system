/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { CalendarView } from 'angular-calendar';
import { MatSidenav } from '@angular/material/sidenav';
import { BaseComponent } from './shared/components';
import { DataService } from './service/data.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  private dataService = inject(DataService);

  @ViewChild('sidemenu') sideMenu: MatSidenav;

  public view: CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public hideDateToggle: boolean;
  public showCloseIcon = false;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    super();
    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }
  ngOnInit(): void {
    this.dataService.hideDateToggle$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((bool) => (this.hideDateToggle = bool));
  }

  closeMenu() {
    void this.sideMenu.close();
    this.showCloseIcon = !this.showCloseIcon;
  }

  handleSideMenu() {
    void this.sideMenu.toggle();
  }
}
