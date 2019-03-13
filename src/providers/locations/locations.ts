import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, take } from 'rxjs/operators';

@Injectable()
export class Locations {

    data: any;

    constructor(public http: Http) {

    }

    load(){

        if(this.data){
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {

            this.http.get('assets/data/locations.json').map(res => res.json()).subscribe(data => {

                this.data = data.locations
                resolve(this.data);

            });

        });

    }

}