import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// plugin One Signal
import { OneSignal } from '@ionic-native/onesignal';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationOneSignalProvider {
	constructor(
    public platform: Platform,
    public http: HttpClient,
    private oneSignal: OneSignal
    ) {
		console.log('Hello NotificationOneSignalProvider Provider');
	}

	// init_notification() {


  //   if(this.platform.is('cordova')) {

  //     this.oneSignal.startInit('b885898f-30ea-41da-a998-ab9daa2d497f', '512846988611')

  //     // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

  //     // notification received -> background || foreground
  //     this.oneSignal.handleNotificationReceived()

  //     this.oneSignal.handleNotificationOpened();

  //     this.oneSignal.endInit();

  //   } else {
  //     console.log('One Signal not Browser Config');
  //   }
	// }
}
