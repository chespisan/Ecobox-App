import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { AliadosPage } from '../aliados/aliados';
import { ComunidadPage } from '../comunidad/comunidad';
import { QuienesSomosPage } from '../quienes-somos/quienes-somos';
import { HomePage } from '../home/home';
import { PreregistroPage } from '../preregistro/preregistro';
import { LocalizacionPage } from '../localizacion/localizacion';
import { LoginPage } from '../../pages/login/login';
//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
//import { urlToNavGroupStrings } from 'ionic-angular/umd/navigation/url-serializer';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  tab1Root: any = HomePage;
  tab2Root: any = PreregistroPage;
  tab3Root: any = LocalizacionPage;
  tab4Root: any = AliadosPage;
  tab5Root: any = ComunidadPage;
  tab6Root: any = QuienesSomosPage;
  //tab7Root: any = this.presentConfirm();
  myIndex: number;

  public alertShown:boolean = false;

  test = 2;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private storage: Storage, public platform: Platform) {
    this.myIndex = navParams.data.tabIndex || 0;
  }
  goToAliados(params) {
    if (!params) params = {};
    this.navCtrl.push(AliadosPage);
  }
  goToComunidad(params) {
    if (!params) params = {};
    this.navCtrl.push(ComunidadPage);
  }
  goToQuienesSomos(params) {
    if (!params) params = {};
    this.navCtrl.push(QuienesSomosPage);
  }
  logoutClicked() {
    this.navCtrl.push(LoginPage);
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Cerrar aplicación',
      message: '¿Deseas salir de la aplicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.alertShown=false;
          }
        },
        {
          text: 'Salir',
          handler: () => {
            console.log('Yes clicked');
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
     alert.present().then(()=>{
      this.alertShown=true;
    });
  }

}
