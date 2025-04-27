import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.services';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class SettingsPage implements OnInit {
   constructor(private AuthService: AuthService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  logout() {
    this.AuthService.logout(); // Ensure your AuthService has this method
    this.router.navigate(['/welcome']);
  }
  goToAcccountRecovery() {
    this.router.navigate(['/account-recovery']);  
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

  goHome() {
    this.router.navigate(['/home']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToTrackMode() {
    this.router.navigate(['/track-mode']);
  }

  goBack() {
    this.location.back();
  }
}
