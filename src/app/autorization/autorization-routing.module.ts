import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutorizationPage } from './autorization.page';

const routes: Routes = [
  {
    path: '',
    component: AutorizationPage
  },
  {
    path: '',
    loadChildren: () => import('../tabs/tabs.module').then( m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorizationPageRoutingModule {}
