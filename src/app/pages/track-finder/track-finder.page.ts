import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-track-finder',
  templateUrl: './track-finder.page.html',
  styleUrls: ['./track-finder.page.scss'],
  standalone: true,
  imports: [IonHeader,CommonModule,IonicModule],
})
export class TrackFinderPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
