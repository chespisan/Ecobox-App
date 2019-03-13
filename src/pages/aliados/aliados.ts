import { Component } from '@angular/core';
import { CanjeoPage } from '../../pages/canjeo/canjeo';
import { IonicPage, NavController, NavParams, App, Tabs } from 'ionic-angular';
@Component({
  selector: 'page-aliados',
  templateUrl: 'aliados.html'
})
export class AliadosPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController,  private app: App ) {

  }
  doCanjeo(){
    this.navCtrl.push(CanjeoPage);
  }

}
