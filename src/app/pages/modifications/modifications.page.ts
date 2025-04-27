import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// Uncomment these imports if using the Ionic Native Camera plugin
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-modifications',
  templateUrl: './modifications.page.html',
  styleUrls: ['./modifications.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ModificationsPage {

  modification = {
    name: '',
    cost: 0,
    description: '',
    image: ''
  };

  constructor(
    // private camera: Camera
  ) { }

  // Example using a Promise via the Camera plugin
  async takePicture() {
    // Uncomment below code after installing the camera plugin and its typings:
    /*
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      const imageData = await this.camera.getPicture(options);
      this.modification.image = 'data:image/jpeg;base64,' + imageData;
    } catch (error) {
      console.error('Camera error:', error);
    }
    */
    // For now, simulate setting an image:
    this.modification.image = 'assets/placeholder-mod.png';
  }

  saveModification() {
    // Save modification data to Firestore (or local storage) here.
    console.log('Modification saved:', this.modification);
  }
}
