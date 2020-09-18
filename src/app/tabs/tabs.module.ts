import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { PopoverComponent } from '../components/popover/popover.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
  ],
  entryComponents: [PopoverComponent],
  declarations: [TabsPage, PopoverComponent]
})
export class TabsPageModule {}
