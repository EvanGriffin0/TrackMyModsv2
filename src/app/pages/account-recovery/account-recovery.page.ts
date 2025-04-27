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
  imports: [ReactiveFormsModule, IonicModule, CommonModule],
})
export class AccountRecoveryPage {
  recoveryForm: FormGroup;
  isSending = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async sendResetEmail() {
    if (!this.recoveryForm.valid) return;
    
    this.isSending = true;
    const email = this.recoveryForm.get('email')?.value;
    
    try {
      await this.authService.sendPasswordResetEmail(email);
      this.presentToast('Password reset link sent! Check your email');
      this.router.navigate(['/login']);
    } catch (error) {
      this.presentToast(this.getErrorMessage(error));
    } finally {
      this.isSending = false;
    }
  }

  getErrorMessage(error: any): string {
    const errorMessages: { [key: string]: string } = {
      'auth/user-not-found': 'No account found with this email',
      'auth/invalid-email': 'Invalid email format',
      'auth/too-many-requests': 'Too many attempts. Try again later'
    };
    return errorMessages[error?.code] || 'Error sending reset link. Try again later';
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    await toast.present();
  }
}