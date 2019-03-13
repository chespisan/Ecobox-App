import { Component } from '@angular/core';
import { AliadosPage } from '../aliados/aliados';
import { ComunidadPage } from '../comunidad/comunidad';
import { QuienesSomosPage } from '../quienes-somos/quienes-somos';
import { PreregistroPage } from '../preregistro/preregistro';
import { LocalizacionPage } from '../localizacion/localizacion';
import { LoginPage } from '../../pages/login/login';
import { DetallePage } from '../../pages/detalle/detalle';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams, App, Tabs } from 'ionic-angular';


/**Servicio desde Firebase para Notificaciones - Detalle de las Campañas */
import { DataProvider } from "../../providers/data-service/data-service";
import { GlobalDataProvider } from "../../providers/global-data/global-data";
/***/

// Notificaciones One Signal
import { NotificationOneSignalProvider } from '../../providers/notification-one-signal/notification-one-signal';
import { OneSignal } from '@ionic-native/onesignal';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  tab1Root = HomePage;
  tab2Root = PreregistroPage;
  tab3Root = LocalizacionPage;
  tab4Root = AliadosPage;
  tab5Root = ComunidadPage;
  tab6Root = QuienesSomosPage;
  tab7Root = LoginPage;
  myIndex: number;

  campanaslists:any;
  userslists:any;
  userFullname:any;
  userEcoins:any;
  preregistersCount:any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public data:DataProvider,
    public globalDataProvider: GlobalDataProvider,
    private app: App,
    public pushNotification: NotificationOneSignalProvider,
    public oneSignal: OneSignal
    ) {
    if(globalDataProvider.userId == 0){// no se ha logueado
        this.navCtrl.push(LoginPage);
    }
    this.userFullname = globalDataProvider.fullname;
    this.userEcoins = globalDataProvider.ecoins;
    this.preregistersCount = globalDataProvider.preregistersCount;
  }

  ionViewDidLoad(){

    /** One Signal Service */
    this.init_notification();
    console.log('LOCAL STORAGE',localStorage.getItem('campanas'));


    //console.log('this.data.campanas', this.data.campanas);
    //this.campanaslists = this.data.campanas;
  }

  itemClicked(item):void {
    this.navCtrl.push(DetallePage, item);
  }

  init_notification() {

    this.campanaslists = [];

    if(this.platform.is('cordova')) {

      this.oneSignal.startInit('b885898f-30ea-41da-a998-ab9daa2d497f', '512846988611');

      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe((res) => {
        console.log('notification received', res.payload.additionalData);
        if(localStorage.getItem('campanas')) {
          // concat object assing
        } else {

        }
        localStorage.setItem('campanas', JSON.stringify(res.payload.additionalData));

      });

      this.oneSignal.handleNotificationOpened().subscribe((res) => {
        console.log('notification opened', res.notification.payload.additionalData);
        //.....
      });

      this.oneSignal.endInit();

    } else {
      console.log('One Signal not Browser Config');
    }
	}



}
