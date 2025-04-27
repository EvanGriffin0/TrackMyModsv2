// src/app/pages/signup/signup.page.ts
import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services'; // Adjust the import path as necessary


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule],
})
export class SignupPage {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      securityAnswer1: ['', Validators.required],
      securityAnswer2: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to verify passwords match.
  passwordMatchValidator(formGroup: FormGroup): null | object {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (!this.signupForm.valid) return;
    const { email, password, securityAnswer1, securityAnswer2 } = this.signupForm.value;
  
    try {
      await this.authService.signUp(email, password, securityAnswer1, securityAnswer2);
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Signup Error:', error); // Check browser console
  
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Email is already in use.';
      } else if (error.code === 'permission-denied') {
        this.errorMessage = 'Failed to save security answers. Contact support.';
      } else {
        this.errorMessage = error.message || 'Registration failed.';
      }
    }
  }
}