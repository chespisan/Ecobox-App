import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { RegistrarPage } from '../../pages/registrar/registrar';
import { RecuperarPage } from '../../pages/recuperar/recuperar';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs';
import { GlobalDataProvider } from "../../providers/global-data/global-data";
import { Storage } from '@ionic/storage';
import { TabsControllerPage } from '../../pages/tabs-controller/tabs-controller';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  @ViewChild("phone") phone;
  @ViewChild("password") password;
  data: string;
  items: any;
  tabBarElement: any;
  remembermechecked : boolean;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    private http: Http, public loading: LoadingController,
    public globalDataProvider: GlobalDataProvider, private storage: Storage)
    {
      this.remembermechecked = false;

   this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    let storaged = this.storage.get('phone').then((val) => {
      this.phone.value = val;
    });
    let storagede = this.storage.get('password').then((val) => {
      this.password.value = val;
    });
  }



  toogleRememberme(){
    this.remembermechecked = !this.remembermechecked
  }


  ionViewWillEnter() {
    //this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    //this.tabBarElement.style.display = 'flex';
  }
  goToRegistrar() {
    this.navCtrl.push(RegistrarPage);
  }
  goToRecuperar() {
    this.navCtrl.push(RecuperarPage);
  }
  doLogin() {
    if (this.phone.value == "") {
      let alert = this.alertCtrl.create({
        title: "Error de validación",
        subTitle: "El campo Celular está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    if (this.password.value == "") {
      let alert = this.alertCtrl.create({
        title: "Error de validación",
        subTitle: "El campo Contraseña está vacío.",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    //else{
      //this.navCtrl.push(HomePage);
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let data = {
          phone: this.phone.value,
          password: this.password.value
        };

        if(this.remembermechecked == true){
          this.storage.set('phone', this.phone.value);
          this.storage.set('password', this.password.value);
        }
        // set a key/value
        let loader = this.loading.create({
          content: 'Procesando, por favor espera…',
        });
        loader.present().then(() => {
          this.http.post('http://ecoboxrecicla.com/ecobox/login.php', data, options)
            .map(res => res.json())
            .subscribe(res => {
              loader.dismiss()
              if (res.status == "success") {
                // Guarda el id el usuario en una variable global
                this.globalDataProvider.userId = res.details.id;
                this.globalDataProvider.fullname = res.details.fullname;
                this.globalDataProvider.ecoins = res.details.ecoins;
                this.globalDataProvider.preregistersCount = res.details.preRegistersCount;
                this.navCtrl.setRoot(TabsControllerPage, data);
              } else {
                let alert = this.alertCtrl.create({
                  title: "Error de conexión",
                  subTitle: "Parece que has ingresado un número de teléfono o contraseña no válido",
                  buttons: ['OK']
                });
                alert.present();
              }
            });
        });
      }
  }



