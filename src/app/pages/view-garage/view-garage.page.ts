import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable, of, combineLatest } from 'rxjs';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';
import { switchMap, map } from 'rxjs/operators';

// Define the Modification interface
interface Modification {
  id?: string;
  name: string;
  cost: number;
  type: string;
  description: string;
  date: Date;  // Converted from Firestore Timestamp
  image: string;
  vehicleId: string;
}

// Define the Vehicle interface
interface Vehicle {
  id: string;
  vehicleName?: string;
  vehicleType?: string;
  mileage?: string;
  power?: string;
  year?: string;
  modsDone: number;
  modifications: Modification[];
}

// Firestore data converter for modifications
const modificationConverter = {
  toFirestore: (data: Modification) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data();
    return {
      id: snap.id,
      name: data['name'],
      cost: data['cost'],
      type: data['type'],
      description: data['description'],
      date: (data['date'] as Timestamp).toDate(), // Convert Firestore timestamp to Date
      image: data['image'],
      vehicleId: data['vehicleId']
    } as Modification;
  }
};

@Component({
  selector: 'app-view-garage',
  templateUrl: './view-garage.page.html',
  styleUrls: ['./view-garage.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ViewGaragePage implements OnInit {
  vehicles$!: Observable<Vehicle[]>;
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
        
        this.vehicles$ = collectionData(vehiclesRef, { idField: 'id' }).pipe(
          switchMap((vehicles: any[]) => {
            // Check if there are any vehicles – if not, return an empty array observable
            if (vehicles.length > 0) {
              return combineLatest(
                vehicles.map(vehicle => {
                  const modsRef = collection(
                    this.firestore, 
                    `users/${user.uid}/vehicles/${vehicle.id}/modifications`
                  ).withConverter(modificationConverter);
                  
                  return collectionData(modsRef).pipe(
                    map((modifications: Modification[]) => ({
                      ...vehicle,
                      modifications: modifications,
                      modsDone: modifications.length
                    } as Vehicle))
                  );
                })
              );
            } else {
              return of([]);
            }
          })
        );
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
      const vehicleDoc = doc(this.firestore, `users/${user.uid}/vehicles/${vehicleId}`);
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
  goHome() {
    this.router.navigate(['/home']);
  }
}
