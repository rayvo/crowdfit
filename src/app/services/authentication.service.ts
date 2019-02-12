import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { UserService } from './user.service';

import * as firebase from 'firebase/app';
import { NewAccount } from '../modals/user';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private userService: UserService,
    public navCtrl: NavController,
    private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    })
  }
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  login() {
    return this.storage.set(TOKEN_KEY, 'Taeyu Im 19831210').then(() => {
      this.authenticationState.next(true);
    });
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }


  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
          .then()
          .catch(error => {
            console.error(error);
            throw new Error(error);
          });
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  signupUser(email: string, password: string, name: string, phone: string, usertype: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/users/${newUserCredential.user.uid}`)
          .set({ name, email, phone, usertype });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }
}
