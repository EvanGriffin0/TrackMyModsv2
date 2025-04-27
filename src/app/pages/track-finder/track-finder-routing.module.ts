import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackFinderPage } from './track-finder.page';

const routes: Routes = [
  {
    path: '',
    component: TrackFinderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackFinderPageRoutingModule {}
