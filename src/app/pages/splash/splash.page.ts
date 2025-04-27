import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonHeader, IonicModule]
})
export class SplashPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    // After 3 seconds, redirect to the welcome page
    setTimeout(() => {
      this.navCtrl.navigateRoot('/welcome');
    }, 3000);
  }
}