import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
/*Insertar las notificaciones de Firebase*/

  campanas: any = [
      {
          title: 'Jornada de Reciclaje',
          dire: 'Sede Universidad Javeriana, Bogotá',
          init: '05/03/2019',
          end: '06/03/2019',
          description: 'Lorem ipsum dolor sit amet pellentesque sit ametseque'
      },
      {
        title: 'Jornadas masivas de Reciclaje',
        dire: 'Cento de Bogotá',
        init: '10/03/2019',
        end: '11/03/2019',
        description: '2 Lorem ipsum dolor sit amet pellentesque sit ametseque'
      },
      {
        title: 'Visitamos las tiendas',
          dire: 'Calles de Bogotá',
          init: '05/04/2019',
          end: '10/05/2019',
          description: ' 3 Lorem ipsum dolor sit amet pellentesque sit ametseque'
      },
      {
        title: 'Trae 3 envases',
          dire: 'Sucursal Portal Norte, Bogotá',
          init: '10/05/2019',
          end: '10/05/2019',
          description: '4 Lorem ipsum dolor sit amet pellentesque sit ametseque'
      }
  ];

  users: any = [
    {
        name: 'Juan',
        ecoins: '145',
    },
  ];

  constructor() {
  }

  /*getListDetails(){
    return this.http.get('assets/data/products.json')
      .map((response:Response)=>response.json());
  }*/
}


