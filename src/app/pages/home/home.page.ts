import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.services'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ]  
})
export class HomePage implements OnInit {

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