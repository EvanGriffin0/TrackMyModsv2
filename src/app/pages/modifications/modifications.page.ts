import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Auth,onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export interface Modification {
  name: string;
  cost: number;
  type: 'performance' | 'cosmetic';
  description: string;
  image: string;
  date: Date;
  vehicleId?: string;
}

@Component({
  selector: 'app-modifications',
  templateUrl: './modifications.page.html',
  styleUrls: ['./modifications.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})


export class ModificationsPage {
  vehicles$: any;
  selectedVehicleId: string | null = null;
  modification = {
    name: '',
    cost: 0,
    type: 'performance',
    description: '',
    image: '',
    date: new Date()
  };


  
  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const vehiclesRef = collection(this.firestore, `users/${user.uid}/vehicles`);
        this.vehicles$ = collectionData(vehiclesRef, { idField: 'id' });
      }
    });
  }
  
  private auth = inject(Auth);
  private location = inject(Location);
  private router = inject(Router);
  private firestore = inject(Firestore);

  constructor() {
    this.loadVehicles();
  }

  
  async loadVehicles() {
    const user = this.auth.currentUser;
    if (user) {
      const vehiclesRef = collection(this.firestore, `users/${user.uid}/vehicles`);
      this.vehicles$ = collectionData(vehiclesRef, { idField: 'id'});
    }
  }

  async saveModification() {
    const user = this.auth.currentUser;
    if (!user || !this.selectedVehicleId) return;

    try {
      const modsRef = collection(
        this.firestore,
        `users/${user.uid}/vehicles/${this.selectedVehicleId}/modifications`
      );
      
      await addDoc(modsRef, {
        ...this.modification,
        vehicleId: this.selectedVehicleId
      });
      
      this.resetForm();
      console.log('Modification saved successfully!');
    } catch (error) {
      console.error('Error saving modification:', error);
    }
  }

  private resetForm() {
    this.modification = {
      name: '',
      cost: 0,
      type: 'performance',
      description: '',
      image: '',
      date: new Date()
    };
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

  goBack() {
    this.location.back();
  }
}

