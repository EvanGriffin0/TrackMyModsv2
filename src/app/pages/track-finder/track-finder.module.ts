import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackFinderPageRoutingModule } from './track-finder-routing.module';

import { TrackFinderPage } from './track-finder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackFinderPageRoutingModule
  ],
  declarations: [TrackFinderPage]
})
export class TrackFinderPageModule {}
