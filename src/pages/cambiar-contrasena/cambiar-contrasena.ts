import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { RecuperarPage } from '../../pages/recuperar/recuperar';
import { Http, Headers, RequestOptions } from "@angular/http";
import { GlobalDataProvider } from "../../providers/global-data/global-data";
import { HomePage } from '../../pages/home/home';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'page-cambiar-contrasena',
  templateUrl: 'cambiar-contrasena.html'
})
export class CambiarContrasenaPage {
  @ViewChild("password") password;
  @ViewChild("confirmedPassword") confirmedPassword;


  constructor(public navCtrl: NavController,
                public loading: LoadingController,
                private http: Http,
                public alertCtrl: AlertController,
                public globalDataProvider: GlobalDataProvider) {
  }
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  goToRecuperar(){
    this.navCtrl.push(RecuperarPage);
  }


  goToValidLogin() {
    if (this.password.value == "") {
      let alert = this.alertCtrl.create({
        title: "Error de validación",
        subTitle: "El campo Número Telefónico es obligatorio",
        buttons: ['OK']
      });
      alert.present();
      return
    }

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      password: this.password.value,
    };

    let loader = this.loading.create({
      content: 'Procesando, por favor espera…',
    });

    loader.present().then(() => {
      this.http.post('http://ecoboxrecicla.com/ecobox/cambiocontrasena.php', data, options)
        .map(res => res.json())
        .subscribe(res => {
          loader.dismiss()
          if (res.status == "success") {
            let alert = this.alertCtrl.create({
              title: "Ok!",
              subTitle: ("Contraseña Actualizada"),
              buttons: ['OK']
            });

            alert.present();
            this.navCtrl.push(LoginPage);
          } else {
            let alert = this.alertCtrl.create({
              title: "Intente nuevamente",
              subTitle: (res.details),
              buttons: ['OK']
            });
            alert.present();
          }
        });
    });
  }

  
  goToCambiar(){
    
    if(this.password.value != this.confirmedPassword.value)
    {
      let alert = this.alertCtrl.create({
        title: "La contraseña debe coincidir con la confirmación",
        buttons: ['Ok']
      });
      alert.present();
      return;
    }


    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let data = {
      contrasena: this.password.value,
       userId: this.globalDataProvider.userId
    };
    let loader = this.loading.create({
      content: 'Procesando, por favor espera…',
    });

    loader.present().then(() => {
      this.http.post('http://ecoboxrecicla.com/ecobox/cambiocontrasena.php', data, options)
        .map(res => res.json())
        .subscribe(res => {
          loader.dismiss()
          if (res.status == "success") {
            // Agrega un pre registro a los preregisros

            let alert = this.alertCtrl.create({
              title: res.details,
              buttons: ['Ok']
            });
            alert.present();
            this.navCtrl.setRoot(LoginPage, data);
          } else {
            let alert = this.alertCtrl.create({
              title: "Error de conexiòn",
              subTitle: res.details,// "Parece que ha no se ha reconocido el Codigo de Barras",
              buttons: ['OK']
            });
            alert.present();
          }
        });
    }); 
  }

}
