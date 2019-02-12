import { Component } from '@angular/core';

import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { User } from './modals/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;

  user: User = {
    uid: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    usertype: '',
    birthday: '',
    photoURL: ''
  }
  userID = null

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private authenticationService: AuthenticationService,

    private router: Router,    
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private userService: UserService
  ) {
    this.appPages = [
      {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'About',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      {
        title: 'App Settings',
        url: '/settings',
        direct: 'forward',
        icon: 'cog'
      }
    ];

    this.initializeApp();
  }

  initializeApp() {
    console.log("initializeApp()")
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.authenticationState.subscribe(state => {
        console.log("TAEYU-state=" + state)
        if (state) {
          console.log("TAEYU2")
          if (this.afAuth.auth.currentUser) {
            const currentUser = this.afAuth.auth.currentUser
            this.userID = currentUser.uid
            console.log("app.component: userID=" + this.userID)
            this.loadUser()            
          }           
        } else {
          console.log("BE KICKED OUT")
          this.router.navigate(['login']);
        }
      });
    }).catch(() => {});
  }

  async loadUser() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading User..'
    })
    await loading.present
    this.userService.getUser(this.userID).subscribe(res => {
      loading.dismiss();
      this.user = res;
      if (this.user.usertype==='관리자') {
        this.appPages = [                    
          {
            title: 'Admin Home',
            url: '/home-results',
            direct: 'root',
            icon: 'home'
          },
          {
            title: 'Admin Settings',
            url: '/settings',
            direct: 'forward',
            icon: 'cog'
          },
          {
            title: 'Admin About',
            url: '/about',
            direct: 'forward',
            icon: 'information-circle-outline'
          }
        ];
      } else if (this.user.usertype==='회원') {
        this.appPages = [
          {
            title: 'Member Home',
            url: '/home-results',
            direct: 'root',
            icon: 'home'
          },
          {
            title: 'Member Settings',
            url: '/settings',
            direct: 'forward',
            icon: 'cog'
          },
          {
            title: 'Member About',
            url: '/about',
            direct: 'forward',
            icon: 'information-circle-outline'
          }
        ];
          
      }
      this.router.navigate(['members', 'dashboard']);
    })
  }
  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.authenticationService.logout();
    this.navCtrl.navigateRoot('/');
  }
}
