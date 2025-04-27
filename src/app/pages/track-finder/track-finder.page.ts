import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-track-finder',
  templateUrl: './track-finder.page.html',
  styleUrls: ['./track-finder.page.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule],
})
export class TrackFinderPage implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) { }
  

  ngOnInit() {
  }
  goToGarage() {
    this.router.navigate(['/garage']);
  }
  goToTrackFinder() {
    this.router.navigate(['/track-finder']);
  }
  
  goToModifications() {
    this.router.navigate(['/modifications']);
  }


  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToTrackMode() {
    this.router.navigate(['/track-mode']);
  }
}
