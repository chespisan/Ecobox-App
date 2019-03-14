import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// plugin One Signal
import { OneSignal } from '@ionic-native/onesignal';
import { Observable } from 'rxjs';
import { CustomStorageProvider } from '../custom-storage/custom-storage';


@Injectable()
export class NotificationOneSignalProvider {
	myObject: any;
	constructor(
    public platform: Platform,
    public http: HttpClient,
    private oneSignal: OneSignal,
    public customStorage: CustomStorageProvider
    ) {
    console.log('Hello NotificationOneSignalProvider Provider');
    this.myObject = [];
	}

	init_notification() {
		if (this.platform.is('cordova')) {
			console.log('INIT NOTIFICATION');

			this.oneSignal.startInit('217bd436-a28b-4c8b-8317-d9b03d0fc3c8', '512846988611');
			this.notificationReceived();
			this.notificationOpen();
			this.oneSignal.endInit();
		} else {
			console.log('One Signal not Browser Config');
		}
	}

	notificationReceived() {
		console.log('received');
		return this.oneSignal.handleNotificationReceived().subscribe((res) => {
      console.log('notification received', res.payload.additionalData);
      this.oneSignal.endInit();
		});
	}

	notificationOpen() {
		console.log('open');

		return this.oneSignal.handleNotificationOpened().subscribe((res) => {
			console.log('notification opened', res.notification.payload.additionalData);

			//this.ngAfterContentChecked();

      this.customStorage.set('campanas',res.notification.payload.additionalData);
      this.oneSignal.endInit();

      // let notification = [];
      // let notificationCurrent = res.notification.payload.additionalData;

      // this.customStorage.get('campanas').then(res => {

      //   if(res) {
      //     console.log('RES GET LS', res);
      //     notification.push(res);
      //     notification.push(notificationCurrent);

      //     console.log('ARRAY GET LS', notification);
      //     this.customStorage.set('campanas', notification);
      //   } else {
      //     console.log('RES SET LS', res);
      //     notification.push(notificationCurrent);
      //     this.customStorage.set('campanas', notification);
      //   }


      });


      //this.customStorage.set('campanas',res.notification.payload.additionalData);

			// if (localStorage.getItem('campanas')) {
			// 	let getLocalStorage = JSON.parse(localStorage.getItem('campanas'));
			// 	let response = res.notification.payload.additionalData;

			// 	getLocalStorage.push(response);
			// 	localStorage.setItem('campanas', JSON.stringify(getLocalStorage));
			// } else {

			// 	this.myObject.push(res.notification.payload.additionalData);

      //   console.log('this my object', this.myObject);

      //   this.customStorage.set('campanas', this.myObject);
			// 	//localStorage.setItem('campanas', JSON.stringify(this.myObject));

      //   //	this.campanaslists = this.myObject;
      // }

		//});
	}
}
