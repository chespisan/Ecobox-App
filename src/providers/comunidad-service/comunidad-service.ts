import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SoporteProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SoporteProvider {

  constructor(public http: HttpClient) {
  }

  sendSupport1(lugar_param){
    let body={
      to: 'camorojs@gmail.com',
      cc: 'usuarios@myecobox.org',
      subject: 'Está lleno el EcoBox que utilicé.',
      body: 'Ubicación: ' + 'dato1',
      isHtml: true
    }
    return this.http.post('nuevoEmail/',body,{})
  }

}