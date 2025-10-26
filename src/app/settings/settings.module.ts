import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { KitchenComponent } from './kitchen/kitchen.component';
import { EditSectionsComponent } from './edit-sections/edit-sections.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ColorService } from '../service/color.service';
import { SectionService } from '../service/section.service';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    MatExpansionModule,
    EditSectionsComponent,
    SettingsRoutingModule,
    KitchenComponent,
  ],
  providers: [SectionService, ColorService],
})
export class SettingsModule {}
