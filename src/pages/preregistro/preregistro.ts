import { Component } from '@angular/core';
import { InstruccionesPage } from '../../pages/instrucciones/instrucciones';
import { LocalizacionPage } from '../../pages/localizacion/localizacion';
import { CameringPage } from '../../pages/camering/camering';
import { ScanningPage } from '../../pages/scanning/scanning';
import { IonicPage, NavController, NavParams, App, Tabs } from 'ionic-angular';

@Component({
  selector: 'page-preregistro',
  templateUrl: 'preregistro.html'
})
export class PreregistroPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private app: App) {
  }
  goToInstrucciones(){
    this.navCtrl.push(InstruccionesPage);
  }
  goToLocalizacion(){
    this.navCtrl.push(LocalizacionPage);
  }
    goToCamering(){
    this.navCtrl.push(CameringPage);
  }
    goToScanning(){
    this.navCtrl.push(ScanningPage);
  }

}