// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  // Sign up a new user and store security question answers in Firestore.
  async signUp(email: string, password: string, securityAnswer1: string, securityAnswer2: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user?.uid;
  
      if (!uid) throw new Error('User UID not found');
  
      // Write security answers to Firestore
      await this.afs.collection('userSecurity').doc(uid).set({
        email,
        securityAnswer1,
        securityAnswer2
      });
  
      return userCredential;
    } catch (error) {
      console.error('Firestore Error:', error); // Log detailed error
      throw error; // Propagate to component
    }
  }
  

  // Login a user.
  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Retrieve stored security data (by email) from Firestore.
  async getSecurityData(email: string) {
    const query$ = this.afs
      .collection('userSecurity', ref => ref.where('email', '==', email))
      .get();
  
    const querySnapshot = await lastValueFrom(query$); // ✅ Modern approach
  
    let securityData: any = null;
    if (!querySnapshot.empty) {
      querySnapshot.forEach(doc => {
        securityData = doc.data();
      });
    }
    return securityData;
  }


}
