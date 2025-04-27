import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewGaragePage } from './view-garage.page';

const routes: Routes = [
  {
    path: '',
    component: ViewGaragePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackModePageRoutingModule {}
