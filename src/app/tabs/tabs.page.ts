import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { GuiService } from '../services/gui.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public popoverController: PopoverController,
    public guiService: GuiService) { }

  async userSetting(ev: any) {
    console.log('click')
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
