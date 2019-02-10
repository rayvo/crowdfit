import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PopoverController, MenuController, LoadingController } from '@ionic/angular';
import { NotificationsComponent } from './../../../components/notifications/notifications.component';
import { Pages } from 'src/app/interfaces/pages';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/modals/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  

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


  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/clubfit-cover.jpg';

  public appPages: Array<Pages>;

  constructor(
    private authService: AuthenticationService,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private userService: UserService) { 

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

    }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);    
  }
  ngOnInit() {
    if (this.afAuth.auth.currentUser) {
      const currentUser = this.afAuth.auth.currentUser
      this.userID = currentUser.uid
    } else {
      console.log("app.component:" + "currentUser NO")
    }

    if (this.userID) {
      this.loadUser()
      console.log("TAEYU-" + "USERID")
    } else {
      this.userID = 'Y0nKsthi7aeLij4SZS7dv1wRogk1'
      console.log("TAEYU-" + "NO USERID")

      this.loadUser()
    }
  }

  async loadUser() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading User..'
    })
    await loading.present
    this.userService.getUser(this.userID).subscribe(res => {
      loading.dismiss();
      this.user = res;
    })
  }

  logout() {
    this.authService.logout();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }
}
