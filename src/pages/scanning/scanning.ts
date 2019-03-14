import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Flashlight } from '@ionic-native/flashlight';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HomePage } from '../../pages/home/home';
import { GlobalDataProvider } from "../../providers/global-data/global-data";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the ScanningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scanning',
  templateUrl: 'scanning.html',
})

export class ScanningPage {
  @ViewChild("qrCode") qrCode;
  @ViewChild("lat") lat;
  @ViewChild("longt") longt;
  @ViewChild("userId") userId;

  preRegisters: any;
  tabBarElement: any;

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
    this.preRegisters = globalDataProvider.preregistersCount;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  clickFlash(){
    this.flashlight.toggle();
  }
  scanQRCode() {

    this.platform.ready().then(() => {

      let lat = 5.515674;
      let lgt = -73.3587757;
      this.geolocation.getCurrentPosition().then((resp) => {
        try {
          lat = resp.coords.latitude;
          lgt = resp.coords.longitude;
        } catch (error) {
        }
      }).catch((error) => {
        //alert(error.message)
      });

      let qrCode = "--";
      this.barcodeScanner.scan().then((barcodeData) => {
        qrCode = barcodeData.text;

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let data = {
          lat: lat,
          longt: lgt,
          userId: this.globalDataProvider.userId,
          qrCode: qrCode
        };
        let loader = this.loading.create({
          content: 'Procesando, por favor espera…',
        });
        loader.present().then(() => {
          this.http.post('http://ecoboxrecicla.com/ecobox/qr.php', data, options)
            .map(res => res.json())
            .subscribe(res => {
              loader.dismiss()
              if (res.status == "success") {
                this.globalDataProvider.preregistersCount = this.globalDataProvider.preregistersCount - res.details;
                let alert = this.alertCtrl.create({
                  title: "Se han registrado "+ res.details +" Codigos de barra pre registrados!",
                  buttons: ['Continuar']
                });
                alert.present();
                this.navCtrl.setRoot(HomePage, data);
              } else {
                let alert = this.alertCtrl.create({
                  title: "Se presentó un error al Procesar su solicitud",
                  buttons: ['OK']
                });
                alert.present();
              }
            });
        });
      }, (err) => {
      });

    });

  }



}
