import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Flashlight } from '@ionic-native/flashlight';
import { CompartirService } from '../../services/compartir.service';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HomePage } from '../../pages/home/home';
import { GlobalDataProvider } from "../../providers/global-data/global-data";
import { AndroidPermissions } from "@ionic-native/android-permissions";

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
/*ACA SE GESTIONAN LOS CODIGOS DE BARRAS*/

/**
 * Generated class for the CameringPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-camering',
  templateUrl: 'camering.html',
})
export class CameringPage {

  userEcoins:any;

  constructor(public navCtrl: NavController,
    private http: Http,
    public globalDataProvider: GlobalDataProvider,
    public alertCtrl: AlertController,
    private flashlight: Flashlight,
    private barcodeScanner: BarcodeScanner,
    public loading: LoadingController,
    private geolocation: Geolocation,
    public platform: Platform
  ) {
  }

  clickFlash(){
    this.flashlight.toggle();
  }
  ionViewWillEnter() {
   this.scanBarCode();
  }

  scanBarCode() {
    
    this.platform.ready().then(() => {
      let barCode = "--";
      this.barcodeScanner.scan().then((barcodeData) => {
        barCode = barcodeData.text;
        var headers = new Headers();
        headers.append("Aceptar", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let data = {
          barCode: barCode,
          userId: this.globalDataProvider.userId
        };
        let loader = this.loading.create({
          content: 'Procesando, por favor espera…',
        });

        loader.present().then(() => {
          this.http.post('http://ecoboxrecicla.com/ecobox/barcode.php', data, options)
            .map(res => res.json())
            .subscribe(res => {
              loader.dismiss()
              if (res.status == "success") {
                // Agrega un pre registro a los preregisros
                this.globalDataProvider.preregistersCount ++;

                let alert = this.alertCtrl.create({
                  title: "Código registrado",
                  subTitle: res.detail,
                  buttons: ['Continuar']
                });
                alert.present();
                this.navCtrl.setRoot(HomePage, data);
              } else {
                let alert = this.alertCtrl.create({
                  title: "No se ha reconocido el código de barras",
                  subTitle: res.detail,// "Parece que ha no se ha reconocido el Codigo de Barras",
                  buttons: ['Intentar nuevamente']
                });
                alert.present();
              }
            });
        }); 
      }, (err) => {
        let alert = this.alertCtrl.create({
          title: "Error de conexión. Intente nuevamente",
          buttons: ['OK']
        });
        alert.present();
      });
    });
  }
}
