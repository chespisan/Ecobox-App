import { Injectable } from '@angular/core';

@Injectable()
export class CompartirService {
	
    ecoinsCount: string;

    constructor() {
        this.ecoinsCount = '0';
    }
 
    setEcoinsCount(ecoinsCount) {
        this.ecoinsCount = ecoinsCount;     
    }
 
    getEcoinsCount() {
        return this.ecoinsCount;
    }  
}