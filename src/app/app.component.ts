import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { App } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LoginPage } from '../pages/login/login';

// Provider One Signal Notification
import { NotificationOneSignalProvider } from '../providers/notification-one-signal/notification-one-signal';



@Component({
  templateUrl: 'app.html'
})
export class EcoboxApp {
  //rootPage:any = LoginPage;
  rootPage:any = LoginPage;

  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public androidPermissions: AndroidPermissions,
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl : ModalController,
    public pushOneSignal: NotificationOneSignalProvider
  ){
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
       this.splashScreen.hide();


       // service Push one signal
       this.pushOneSignal.init_notification();

     //let splash = this.modalCtrl.create(Splash);
    //  splash.present();
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.CAMERA
        ],
      );
    });
    this.platform.registerBackButtonAction(() => {
      // Para vista activa
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();
      // Asegura devolución segun alerta
      if(activeView.name === 'HomePage') {
          if (nav.canGoBack()){
              nav.pop();
          } else {
              const alert = this.alertCtrl.create({
                  title: '¿Deseas salir de la aplicación?',
                  buttons: [{
                      text: 'Cancelar',
                      role: 'cancel',
                      handler: () => {
                        this.nav.setRoot('HomePage');
                        console.log('** Salida del app Cancelada! **');
                      }
                  },{
                      text: 'Cerrar aplicación',
                      handler: () => {
                        this.logout();
                        this.platform.exitApp();
                      }
                  }]
              });
              alert.present();
          }
      }
  });
  }

  openPage(page) {
      this.nav.setRoot(page.component);
  }

  logout() {
      this.nav.setRoot('LoginPage');
  }

}
