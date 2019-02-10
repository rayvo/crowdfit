import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/modals/user';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

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
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.afAuth.auth.currentUser) {
      const currentUser = this.afAuth.auth.currentUser
      this.userID = currentUser.uid
    } else {
      console.log("app.component:" + "currentUser NO")
    }

    //this.userID = this.route.snapshot.params['id']
    if (this.userID) {
      this.loadUser()
      console.log("TAEYU-" + "USERID")
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

  async sendData() {
    const loading = await this.loadingCtrl.create({
      message: 'Saving User..'
    })
    await loading.present()

    if (this.userID) {
      this.userService.updateUser(this.user, this.userID).then(() => {
        loading.dismiss()
      })
    } else {
      this.userService.addUser(this.user).then(() => {
        loading.dismiss()
      })
    }
  }

  async sendData1() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        cssClass: 'bg-profile',
        message: 'Your Data was Edited!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.navCtrl.navigateForward('/home-results');
    });
  }

}
