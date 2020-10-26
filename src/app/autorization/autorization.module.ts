import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutorizationPageRoutingModule } from './autorization-routing.module';

import { AutorizationPage } from './autorization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutorizationPageRoutingModule
  ],
  declarations: [AutorizationPage]
})
export class AutorizationPageModule {}
