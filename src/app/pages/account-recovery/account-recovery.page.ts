import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.page.html',
  styleUrls: ['./account-recovery.page.scss'],
})
export class AccountRecoveryPage implements OnInit {
  recoveryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async sendPasswordReset() {
    if (this.recoveryForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Please enter a valid email.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    const { email } = this.recoveryForm.value;
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      const toast = await this.toastCtrl.create({
        message: 'Reset email sent!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      this.navCtrl.navigateBack('/login');
    } catch (err) {
      const toast = await this.toastCtrl.create({
        message: 'Error sending reset email',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
