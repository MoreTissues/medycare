import { Component } from '@angular/core';
import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { DiagonisePage } from '../diagonise/diagonise';
import { HomePatientPage } from '../home-patient/home-patient';
import { LocalstorageProvider } from '../../providers/localstorage/localstorage';

import { AngularFireDatabase, FirebaseListObservable }
  from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import {
  IonicPage, NavController,
  LoadingController,
  Loading,
  AlertController, NavParams
} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userList: FirebaseListObservable<any[]>;
  public loading: Loading;
  user: any = { email: '', password: '' };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    db: AngularFireDatabase,
    public authData: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private localstorage: LocalstorageProvider) {
      this.checkName();      
  }

  login() {
    console.log(this.user);
    console.log(this.user.email);
    this.localstorage.setEmail(this.user.email);
    if (this.user.email === "ollysun@gmail.com") {
      this.navCtrl.setRoot(HomePatientPage);
    }
    //  if (!this.loginForm.valid) {
    //console.log(this.loginForm.value);
    // } else {
    // this.authData.loginUser(this.user.email, this.user.password)
    //   .then(authData => {
    //     this.navCtrl.setRoot(HomePatientPage);
    //    // this
    //   }, error => {
    //     this.loading.dismiss().then(() => {
    //       let alert = this.alertCtrl.create({
    //         message: error.message,
    //         buttons: [
    //           {
    //             text: "Ok",
    //             role: 'cancel'
    //           }
    //         ]
    //       });
    //       alert.present();
    //     });
    //   });

    // this.loading = this.loadingCtrl.create({
    //   dismissOnPageChange: true,
    // });
    // this.loading.present();
  }

  checkName = function ()
  {
    let patientArray = this.authData.getPatientName();
    console.log(patientArray);
  }

  goTo(page) {
    if (page === 'register') {
      this.navCtrl.push(RegisterPage);
    } else if (page === 'resetPassword') {
      this.navCtrl.push(ResetPasswordPage);
    }
  }

  back() {
    if (this.navCtrl.length() >= 2) {
      this.navCtrl.pop();
    }
  }



}
