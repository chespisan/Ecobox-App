import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { CambiarContrasenaPage } from '../../pages/cambiar-contrasena/cambiar-contrasena';
import { Component, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { GlobalDataProvider } from "../../providers/global-data/global-data";


export class User {
  email: string;
}

@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html'
})
export class RecuperarPage {
  @ViewChild("phone") phone;
  @ViewChild("code") code;
  tabBarElement: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private http: Http,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public globalDataProvider: GlobalDataProvider) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }


  resetPassword() {
    if (this.phone.value == "") {
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
      phone: this.phone.value,
    };

    let loader = this.loading.create({
      content: 'Procesando, por favor espera…',
    });
    
    loader.present().then(() => {
      this.http.post('http://ecoboxrecicla.com/ecobox/recuperar.php', data, options)
        .map(res => res.json())
        .subscribe(res => {
          loader.dismiss()
          if (res.status == "success") {
            let alert = this.alertCtrl.create({
              title: "Ok!",
              subTitle: ("Se ha enviado el codigo a tu correo. Ingresalo, y presiona Siguiente"),
              buttons: ['OK']
            });

            this.globalDataProvider.resetPasswordCode = res.details.code;
            this.globalDataProvider.userId = res.details.userId
            alert.present();
            //this.navCtrl.push(LoginPage);
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


  authusernotfound() {
    let toast = this.toastCtrl.create({
      message: 'Email no encontrado',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  authinvalidemail() {
    let toast = this.toastCtrl.create({
      message: 'Ingresar email válido',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  authargumenterror() {
    let toast = this.toastCtrl.create({
      message: 'Ingresar email válido',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  emailsent() {
    let toast = this.toastCtrl.create({
      message: 'El email de recuperación de contraseña ha sido enviado',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentLoadingText() {
    let loading = this.loadingCtrl.create({
      content: 'Por favor espera...'
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.setRoot(LoginPage);
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
/**PARA VALIDAR CODIGO */
  newcodePassword() {
    if (this.code.value == "") {
      let alert = this.alertCtrl.create({
        title: "Error de validación",
        subTitle: "Es necesario insertar el código que recibiste a tu email.",
        buttons: ['OK']
      });
      alert.present();

      
      return
    }
    if(this.globalDataProvider.resetPasswordCode != this.code.value){
      let alert = this.alertCtrl.create({
        title: "Error de validación",
        subTitle: "El código ingresado no es correcto. Intente nuevamente",
        buttons: ['OK']
      });
      alert.present();
    }else{
      this.navCtrl.setRoot(CambiarContrasenaPage);
    }
/*
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      phone: this.phone.value,
    };

    let loader = this.loading.create({
      content: 'Procesando, por favor espera…',
    });

    loader.present().then(() => {
      this.http.post('http://ecoboxrecicla.com/ecobox/validacion.php', data, options)
        .map(res => res.json())
        .subscribe(res => {
          loader.dismiss()
          if (res.status == "success") {
            let alert = this.alertCtrl.create({
              title: "Validación de acceso:",
              subTitle: ("Código autorizado"),
              buttons: ['OK']
            });

            alert.present();
            this.navCtrl.push(LoginPage);
          } else {
            let alert = this.alertCtrl.create({
              title: "Intenta nuevamente",
              subTitle: (res.details),
              buttons: ['Reintentar']
            });
            alert.present();
          }
        });
    });
    */
  }


  goToLogin() {
    this.navCtrl.push(LoginPage);
  }
  goToCambiar() {
    this.navCtrl.push(CambiarContrasenaPage);
  }
}
