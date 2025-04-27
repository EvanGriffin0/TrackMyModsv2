import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackModePage } from './track-mode.page';

const routes: Routes = [
  {
    path: '',
    component: TrackModePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackModePageRoutingModule {}
