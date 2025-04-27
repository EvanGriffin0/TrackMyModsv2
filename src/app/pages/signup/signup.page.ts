import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        mothersMaiden: ['', [Validators.required]],
        firstPet: ['', [Validators.required]]
      },
      { validator: this.checkPasswords }
    );
  }

  // Custom validator: returns null if passwords match
  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  async signup() {
    if (this.signupForm.invalid) {
      const errorToast = await this.toastCtrl.create({
        message: 'Please complete the form correctly.',
        duration: 2000,
        color: 'danger'
      });
      errorToast.present();
      return;
    }
    const { email, password, mothersMaiden, firstPet } = this.signupForm.value;
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Registration successful:', res);
      // You can also save mothersMaiden and firstPet to Firestore here
      this.navCtrl.navigateForward('/home');
    } catch (err) {
      console.error('Signup error', err);
      const toast = await this.toastCtrl.create({
        message: 'Signup Failed. Please try again.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
