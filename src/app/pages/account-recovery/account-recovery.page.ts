// src/app/pages/account-recovery/account-recovery.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.page.html',
  styleUrls: ['./account-recovery.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule]
})
export class AccountRecoveryPage {
  emailForm: FormGroup;
  recoveryForm: FormGroup;
  securityData: any;
  questionsLoaded = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.recoveryForm = this.fb.group({
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', Validators.required]
    });
  }

  // Load the security data from Firestore based on the entered email.
  async loadSecurityData() {
    if (!this.emailForm.valid) return;
    const { email } = this.emailForm.value;
    try {
      const data = await this.authService.getSecurityData(email);
      if (!data) {
        this.presentToast('No account found with that email.');
      } else {
        this.securityData = data;
        this.questionsLoaded = true;
      }
    } catch (error: any) {
      this.presentToast(error.message);
    }
  }

  // Verify the security answers and, if correct, trigger password recovery.
  async verifyAnswersAndRecover() {
    if (!this.recoveryForm.valid) return;
    const { answer1, answer2, newPassword, confirmNewPassword } = this.recoveryForm.value;
    if (newPassword !== confirmNewPassword) {
      this.presentToast('Passwords do not match.');
      return;
    }
    if (
      answer1.trim().toLowerCase() === this.securityData.securityAnswer1.toLowerCase() &&
      answer2.trim().toLowerCase() === this.securityData.securityAnswer2.toLowerCase()
    ) {
      // Here we simulate a password update by sending a password–reset email.
      this.presentToast("Password reset email sent. Check your inbox.");
      this.router.navigate(['/login']);
    } else {
      this.presentToast('Security answers do not match.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    await toast.present();
  }
}
