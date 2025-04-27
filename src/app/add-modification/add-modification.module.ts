import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddModificationPageRoutingModule } from './add-modification-routing.module';

import { AddModificationPage } from './add-modification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddModificationPageRoutingModule,
    AddModificationPage
  ]
  

})
export class AddModificationPageModule {}
