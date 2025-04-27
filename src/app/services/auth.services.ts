import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword,updatePassword ,signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  async verifySecurityAnswers(email: string, answer1: string, answer2: string): Promise<boolean> {
    const q = query(
      collection(this.firestore, 'userSecurity'),
      where('email', '==', email)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return false;

    const userData = querySnapshot.docs[0].data();
    return answer1.toLowerCase().trim() === userData['securityAnswer1'].toLowerCase().trim() &&
           answer2.toLowerCase().trim() === userData['securityAnswer2'].toLowerCase().trim();
  }

    async updateUserPassword(email: string, newPassword: string): Promise<void> {
        // First sign in with temporary credentials (requires special setup)
        const tempPassword = 'temporary_password'; // Should be stored securely
        const userCredential = await signInWithEmailAndPassword(this.auth, email, tempPassword);
        
        // Now update password
        await updatePassword(userCredential.user, newPassword);
        
        // Immediately sign out for security
        await this.auth.signOut();
    }

    async logout(): Promise<void> {
        try {
          await signOut(this.auth);
          this.router.navigate(['/welcome']);
        } catch (error) {
          console.error('Logout Error:', error);
          throw error;
        }
      }

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
 
async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/home']); // Add navigation
    } catch (error) {
      console.error('Login Error:', error);
      throw error; // Propagate error to component
    }
  }
}
