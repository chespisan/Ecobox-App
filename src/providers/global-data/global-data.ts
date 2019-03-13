
    
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalDataProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalDataProvider {

  public userId: number;
  public fullname: string;
  public preregistersCount: number;
  public ecoins: number;
  public resetPasswordCode: string;

  constructor(public http: HttpClient) {
    this.userId = 0;
    this.fullname = "";
    this.ecoins = 0;
    this.preregistersCount = 0;
    this.resetPasswordCode = "";
  } 

}