import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';


import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { NewAccount } from 'src/app/modals/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  newUser: NewAccount

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,

    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public afstore: AngularFirestore,
    public router: Router,
    public user: UserService,
    public authService: AuthenticationService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'name': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      'phone': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async signUp() {
    this.newUser = this.onRegisterForm.value
    this.newUser.usertype='회원'
    this.authService.signupUser(this.newUser.email, this.newUser.password, this.newUser.name, this.newUser.phone, this.newUser.usertype)
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/home-results');
    });
  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
}
