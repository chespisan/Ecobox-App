import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, App, Tabs } from 'ionic-angular';



@Component({
  selector: 'page-comunidad',
  templateUrl: 'comunidad.html'
})
export class ComunidadPage {
 
  constructor(public navCtrl: NavController,    private app: App, private toastCtrl: ToastController, public alertCtrl: AlertController, public http: Http, public formbuilder: FormBuilder, public emailComposer: EmailComposer) {

  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Mensaje enviado. Gracias',
      duration: 5000
    });
    toast.present();
  }
  showAlert1() {
    const prompt = this.alertCtrl.create({
      title: 'Indica la ubicación del EcoBox',
      message: "Especifica la ciudad y ubicación del punto, por ejemplo: 'Bogotá, Portal Norte.'",
      inputs: [
        {
          name: 'Ubicacion1',
          placeholder: 'Escribe la ciudad y punto EcoBox',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar cliqueado');
          }
        },
        {
          text: 'Enviar',
          handler:  (input) =>{
            this.sendEmail1(input.Ubicacion1);
          }
        }
      ]
    });
    prompt.present();
  }
  sendEmail1(ubication) {
    let sicas = false
    this.emailComposer.isAvailable().then((available: boolean) => {
        let email = {
          to: 'ecobox.notificaciones@gmail.com',
          cc : [],
          subject: 'Está lleno el EcoBox que utilicé.',
          body: 'Ubicación: ' + ubication ,
          isHtml: true,
          app: 'Gmail'
        };
        // Send a text message using default options
        this.emailComposer.open(email);
    });

  }

  /**PARA SUPPORT 2 */
  showAlert2() {
    const prompt = this.alertCtrl.create({
      title: 'El EcoBox no está funcionando.',
      message: "Especifica la ciudad y ubicación del punto, por ejemplo: 'Bogotá, Portal Norte.'",
      inputs: [
        {
          name: 'Ubicacion2',
          placeholder: 'Escribe la ciudad y punto EcoBox',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar cliqueado');
          }
        },
        {
          text: 'Enviar',
          handler:  (input) =>{
            this.sendEmail2(input.Ubicacion1);
          }
        }
      ]
    });
    prompt.present();
  }


  sendEmail2(ubication) {
    this.emailComposer.isAvailable().then((available: boolean) => {
        let email = {
          //to: 'ecobox.notificaciones@gmail.com',
          to: 'arodriguez@autsoftsolutions.com',
          subject: 'El EcoBox no está funcionando.',
          body: 'Ubicación sugerida:' + ubication,
          isHtml: true
        };
        this.emailComposer.open(email);
    });
  }

  /*PARA SUPPORT 3 */
  showAlert3() {
    const prompt = this.alertCtrl.create({
      title: 'Vi a alguien vandalizando un EcoBox.',
      message: "Especifica la ciudad y ubicación del punto, por ejemplo: 'Bogotá, Portal Norte.'",
      inputs: [
        {
          name: 'Ubicacion3',
          placeholder: 'Escribe la ciudad y punto EcoBox',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar cliqueado');
          }
        },
        {
          text: 'Enviar',
          handler:  (input) =>{
            this.sendEmail3(input.Ubicacion1);
          }
        }
      ]
    });
    prompt.present();
  }


  sendEmail3(ubication) {
    this.emailComposer.isAvailable().then((available: boolean) => {
        let email = {
          to: 'arodriguez@autsoftsolutions.com',
          subject: 'Vi a alguien vandalizando un EcoBox.',
          body: 'Ubicación sugerida:' + ubication,
          isHtml: true
        };
        this.emailComposer.open(email);
        this.presentToast();
    });
  }
  /*+SUPPORT 4*/
  showAlert4() {
    const prompt = this.alertCtrl.create({
      title: 'Quiero sugerir una nueva ubicación.',
      message: "Especifica la ciudad y ubicación del punto, por ejemplo: 'Bogotá, Portal Norte.'",
      inputs: [
        {
          name: 'Ubicacion4',
          placeholder: 'Escribe la ciudad y punto EcoBox',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar cliqueado');
          }
        },
        {
          text: 'Enviar',
          handler:  (input) =>{
            this.sendEmail4(input.Ubicacion1);
          }
        }
      ]
    });
    prompt.present();
  }


  sendEmail4(ubication) {
    this.emailComposer.isAvailable().then((available: boolean) => {
        let email = {
          to: 'arodriguez@autsoftsolutions.com',
          subject: 'Quiero sugerir una nueva ubicación.',
          body: 'Ubicación sugerida:' + ubication,
          isHtml: true
        };
        this.emailComposer.open(email);
//        this.email.addAlias('gmail', 'com.google.android.gm');
    });
  }



}
