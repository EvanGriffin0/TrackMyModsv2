import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-view-garage',
  templateUrl: './view-garage.page.html',
  styleUrls: ['./view-garage.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ViewGaragePage implements OnInit {
  vehicles$!: Observable<any[]>;
  user: any = null;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private location: Location,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
        const vehiclesRef = collection(this.firestore, `users/${user.uid}/vehicles`);
        this.vehicles$ = collectionData(vehiclesRef, { idField: 'id' });
      } else {
        this.vehicles$ = of([]);
      }
    });
  }

  async deleteVehicle(vehicleId: string) {
    const user = this.auth.currentUser;
    if (!user) {
      console.error('User not authenticated');
      return;
    }
  
    const confirmDelete = await this.presentDeleteAlert();
    if (!confirmDelete) return;
  
    try {
      const vehicleDoc = doc(
        this.firestore, 
        `users/${user.uid}/vehicles/${vehicleId}`
      );
      await deleteDoc(vehicleDoc);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      this.presentErrorToast();
    }
  }
  
  private async presentDeleteAlert(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirm Delete',
        message: 'Are you sure you want to delete this vehicle?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: 'Delete',
            handler: () => resolve(true)
          }
        ]
      });
      await alert.present();
    });
  }
  
  private async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Failed to delete vehicle',
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
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


  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToTrackMode() {
    this.router.navigate(['/view-garage']);
  }
}