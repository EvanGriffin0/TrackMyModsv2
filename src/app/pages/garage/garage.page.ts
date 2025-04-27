// garage.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class GaragePage {
  showForm = false;
  vehicles: any[] = [];
  newVehicle = {
    vehicleName: '',
    mileage: '',
    vehicleType: '',
    power: '',
    year: '',
    modsDone: 0
  };
  constructor(private firestore: Firestore, private auth: Auth, private location: Location,private router:Router) {}


  async saveVehicle() {
    const user = this.auth.currentUser;
    if (!user) {
      alert('Please sign in first!');
      return;
    }
    
    if (this.newVehicle.vehicleName.trim()) {
      try {
        const vehiclesRef = collection(this.firestore, `users/${user.uid}/vehicles`);
        await addDoc(vehiclesRef, this.newVehicle);
        this.showForm = false;
        this.resetForm();
      } catch (error) {
        console.error('Error saving vehicle:', error);
      }
    }
  }


  private resetForm() {
    this.newVehicle = {
      vehicleName: '',
      mileage: '',
      vehicleType: '',
      power: '',
      year: '',
      modsDone: 0
    };
  }

  goBack() {
    this.location.back();
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
    this.router.navigate(['/view-garage']);
  }
}