import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { DataProvider } from "../../providers/data-service/data-service";

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {
  itemInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.itemInfo = this.navParams.data;
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad DetallePage');
  }

}
 