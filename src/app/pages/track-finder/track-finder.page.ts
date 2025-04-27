import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';

declare var google: any; // Declare google from Maps API

@Component({
  selector: 'app-track-finder',
  templateUrl: './track-finder.page.html',
  styleUrls: ['./track-finder.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TrackFinderPage implements AfterViewInit {
  map: any;
  mondelloDistance: number = 0;
  bishopcourtDistance: number = 0;

  constructor(private router: Router) {}

  //once on the page is loaded, load the map
  ngAfterViewInit() {
    this.loadMap();
  }

  //using google maps API to load the map and get the users location
  loadMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          const mapOptions = {
            center: userLatLng,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          };

          // Initialize the map
          this.map = new google.maps.Map(
            document.getElementById("map"),
            mapOptions
          );

          // Marker for user's location
          new google.maps.Marker({
            position: userLatLng,
            map: this.map,
            title: "Your Location",
          });

          // Fixed track coordinates
          const mondelloLatLng = new google.maps.LatLng(53.25750, -6.74500);
          const bishopcourtLatLng = new google.maps.LatLng(54.75844, -2.69531);

          // Calculate distances using computeDistanceBetween from the geometry library
          if (google.maps.geometry && google.maps.geometry.spherical) {
            const distanceMondello = google.maps.geometry.spherical.computeDistanceBetween(
              userLatLng,
              mondelloLatLng
            );
            this.mondelloDistance = distanceMondello / 1000; // convert meters to km

            const distanceBishopCourt = google.maps.geometry.spherical.computeDistanceBetween(
              userLatLng,
              bishopcourtLatLng
            );
            this.bishopcourtDistance = distanceBishopCourt / 1000; // convert meters to km
          }
        },
        (error) => {
          console.error("Error retrieving location", error);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  }

  // Navigation functions
  goBack() {
    this.router.navigate(['/garage']);
  }
  goToGarage() {
    this.router.navigate(['/garage']);
  }
  goToTrackFinder() {
    this.router.navigate(['/track-finder']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
  goToModifications() {
    this.router.navigate(['/modifications']);
  }
  goToTrackMode() {
    this.router.navigate(['/view-garage']);
  }
}
