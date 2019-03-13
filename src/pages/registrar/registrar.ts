import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TermsPage } from '../../pages/terms/terms';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { TutorialPage } from '../../pages/tutorial/tutorial';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html'
})

export class RegistrarPage {
  @ViewChild("fullname") fullname;
  @ViewChild("password") password;
  @ViewChild("email") email;
  @ViewChild("phone") phone;
  @ViewChild("birthday") birthday;
  @ViewChild("age") age;
  @ViewChild("profesion") profesion;
  @ViewChild("gender") gender;
  @ViewChild("country") country;
  @ViewChild("city") city;
  @ViewChild("dire") dire;
  @ViewChild("cedula") cedula;

  tabBarElement: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private http: Http, public loading: LoadingController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  goToTerms() {
    this.navCtrl.push(TermsPage);
  }
  doRegister() {
    //// Para confirmar diligenciamiento de campos fullname, email, phone, password, birthday, direccion, gender, age, profesion, city, country, cedula
    if (this.fullname.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "El campo Nombre está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    } 
    if (this.password.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "El campo Contraseña está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    if (this.email.value == ""  || !this.validateEmail(this.email.value)) {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "Debe ingresar un Correo Electrónico Válido",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    if (this.phone.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "El campo Celular está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    } 
    if (this.birthday.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "El campo Fecha de Nacimiento está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    
    if (this.age.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "Debe ingresar una Edad en años Válida",
        buttons: ['OK']
      });
      alert.present();
      return
    } 
    if (this.profesion.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "El campo Profesión está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    if (this.gender.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "El campo Género está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    if (this.country.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "El campo País está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    if (this.city.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "El campo Ciudad está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    if (this.dire.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "El campo Dirección está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    }
    if (this.cedula.value == "") {
      let alert = this.alertCtrl.create({
        title: "ATENCIÓN",
        subTitle: "El campo Cédula está vacío",
        buttons: ['OK']
      });
      alert.present();
      return
    } 
    
    var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

    
    let birthDate = this.birthday.value.year + "/" + this.birthday.value.month + "/"  + this.birthday.value.day
    
    let data = {
      fullname: this.fullname.value,
      password: this.password.value,
      email: this.email.value,
      phone: this.phone.value,
      birthday: birthDate,
      age: this.age.value,
      profesion: this.profesion.value,
      gender: this.gender.value,
      country: this.country.value,
      city: this.city.value,
      dire: this.dire.value,
      cedula: this.cedula.value
    };

    let loader = this.loading.create({
      content: 'Procesando, por favor espera…',
    });

    loader.present().then(() => {
      this.http.post('http://ecoboxrecicla.com/ecobox/register.php', data, options)
        .map(res => res.json())
        .subscribe(res => {
          loader.dismiss()
          if (res.status == "success") {
            let alert = this.alertCtrl.create({
              title: "Ok!",
              subTitle: ("Usuario registrado"),
              buttons: ['Ver tutorial']
            });

            alert.present();
            this.navCtrl.push(TutorialPage);
            //this.navCtrl.push(LoginPage);
          } else {
            let alert = this.alertCtrl.create({
              title: "Intente nuevamente",
              subTitle: (res.details),
              buttons: ['Intentar nuevamente']
            });
            alert.present();
          }
        });
    });
  }
}
