/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Component, Input, OnInit, inject } from '@angular/core';
import { Colors } from '../../data/colors';
import { Color, ColorService } from '../../service/color.service';
import { FormBuilder } from '@angular/forms';
import { Subject, filter, map } from 'rxjs';

@Component({
  selector: 'app-kitchen-name',
  templateUrl: './kitchen.template.html',
})
export class KitchenComponent implements OnInit {
  private colorService = inject(ColorService);

  public colors$ = this.colorService.colors$.pipe(
    filter((x) => x !== null),
    map((value) => {
      return value.map((objet) => ({
        ...objet,
        edit: false,
      }));
    })
  );
  public isNewColor = false;
  public editColor = false;

  public colorForm = inject(FormBuilder).group({
    name: [''],
    primary: ['#ffffff'],
    secondary: ['#ffffff'],
    secondaryText: ['#ffffff'],
  });

  @Input() refresh: Subject<void>;

  public colors = Colors;
  ngOnInit(): void {
    this.colorService.updateColorList();
  }

  addColor() {
    this.isNewColor = !this.isNewColor;
  }
  acceptNewColor() {
    this.colorService.addColor(this.colorForm.value as Color).subscribe(() => {
      this.isNewColor = false;
      this.colorForm.reset({
        name: '',
        primary: '#ffffff',
        secondary: '#ffffff',
        secondaryText: '#ffffff',
      });
      this.colorService.updateColorList();
      this.refresh.next();
    });
  }

  updateColor(item) {
    this.colorService.editColor(item.id as number, item).subscribe(() => {
      this.colorService.updateColorList();
      this.refresh.next();
    });
  }

  removeColor(item) {
    this.colorService.removeColor(item.id as number).subscribe(() => {
      this.colorService.updateColorList();
      this.refresh.next();
    });
  }
}
