import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    const { email, password } = this.loginForm.value;
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Logged in successfully', res);
      this.navCtrl.navigateForward('/home');
    } catch (err) {
      console.error('Login error', err);
      const toast = await this.toastCtrl.create({
        message: 'Login Failed. Please check your credentials.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
