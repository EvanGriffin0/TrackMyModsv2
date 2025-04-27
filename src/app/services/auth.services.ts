import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async signUp(email: string, password: string, securityAnswer1: string, securityAnswer2: string) {
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      // Save security questions to Firestore
      await this.saveSecurityQuestions(
        userCredential.user.uid,
        email,
        securityAnswer1,
        securityAnswer2
      );

      return userCredential;
    } catch (error) {
      console.error('Signup Error:', error);
      throw error;
    }
  }

  private async saveSecurityQuestions(uid: string, email: string, answer1: string, answer2: string) {
    try {
      const userDoc = doc(this.firestore, `userSecurity/${uid}`);
      await setDoc(userDoc, {
        email,
        securityQuestions: {
          answer1,
          answer2
        },
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Firestore Save Error:', error);
      throw error;
    }
  }

  async getSecurityData(email: string) {
    try {
      const q = query(
        collection(this.firestore, 'userSecurity'),
        where('email', '==', email)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0]?.data();
    } catch (error) {
      console.error('Security Data Error:', error);
      throw error;
    }
  }

  // Update login method
  async login(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}