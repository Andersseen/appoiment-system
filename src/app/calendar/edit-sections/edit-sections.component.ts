/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Section, SectionService } from '../../service/section.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { filter, map } from 'rxjs';

interface EditableSection extends Section {
  edit: boolean;
}

@Component({
  selector: 'app-edit-sections',
  templateUrl: 'edit-sections.template.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class EditSectionsComponent implements OnInit {
  private sectionService = inject(SectionService);

  public sections$ = this.sectionService.sections$.pipe(
    filter((x) => x !== null),
    map((value) => {
      return value.map((objet) => ({
        ...objet,
        edit: false,
      }));
    })
  );
  public isNewSection = false;

  public sectionForm = inject(FormBuilder).group({
    name: [''],
    order: [''],
  });

  ngOnInit(): void {
    this.sectionService.updateSectionList();
  }
  addSection() {
    this.isNewSection = !this.isNewSection;
  }
  acceptNewSection() {
    this.sectionService
      .addSection(this.sectionForm.value as any)
      .subscribe(() => {
        this.isNewSection = false;
        this.sectionForm.reset({
          name: '',
        });
        this.sectionService.updateSectionList();
      });
  }

  editSection(item) {
    this.sectionService.editSection(item.id as number, item).subscribe(() => {
      this.sectionService.updateSectionList();
    });
  }
  removeSection(item) {
    this.sectionService.removeSection(item.id as number).subscribe(() => {
      this.sectionService.updateSectionList();
    });
  }
}
