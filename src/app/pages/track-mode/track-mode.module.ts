import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackModePageRoutingModule } from './track-mode-routing.module';

import { TrackModePage } from './track-mode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackModePageRoutingModule
  ],
  declarations: [TrackModePage]
})
export class TrackModePageModule {}
