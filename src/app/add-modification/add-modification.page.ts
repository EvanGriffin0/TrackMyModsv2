import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModificationService } from '../services/modification.service';

@Component({
  selector: 'app-add-modification',
  templateUrl: './add-modification.page.html',
  styleUrls: ['./add-modification.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AddModificationPage {
  vehicle: string = '';
  description: string = '';
  cost: number = 0;
  imageUrl: string = '';  // For demo, a text URL input

  constructor(private modificationService: ModificationService,
              private router: Router) {}

  // Promise example – simulate an asynchronous image upload operation
  uploadImage(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      // Simulate a delay (e.g., image upload delay)
      setTimeout(() => {
        resolve('https://dummyimage.com/600x400/000/fff'); // return dummy image URL
      }, 2000);
    });
  }

  async addModification() {
    let mod: Modification = {
      vehicle: this.vehicle,
      description: this.description,
      cost: this.cost,
      date: new Date()
    };

    // If there's an image, simulate upload using the Promise
    if (this.imageUrl) {
      try {
        mod.imageUrl = await this.uploadImage(this.imageUrl);
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }

    // Save mod data to Firestore
    this.modificationService.addModification(mod).then(() => {
      this.router.navigate(['/modifications-list']);
    });
  }
}
