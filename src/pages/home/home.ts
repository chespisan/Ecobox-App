import { Component } from '@angular/core';
import { AliadosPage } from '../aliados/aliados';
import { ComunidadPage } from '../comunidad/comunidad';
import { QuienesSomosPage } from '../quienes-somos/quienes-somos';
import { PreregistroPage } from '../preregistro/preregistro';
import { LocalizacionPage } from '../localizacion/localizacion';
import { LoginPage } from '../../pages/login/login';
import { DetallePage } from '../../pages/detalle/detalle';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams, App, Tabs } from 'ionic-angular';

/**Servicio desde Firebase para Notificaciones - Detalle de las Campañas */
import { DataProvider } from '../../providers/data-service/data-service';
import { GlobalDataProvider } from '../../providers/global-data/global-data';
/***/

// Notificaciones One Signal
import { NotificationOneSignalProvider } from '../../providers/notification-one-signal/notification-one-signal';
import { OneSignal } from '@ionic-native/onesignal';

import { CustomStorageProvider } from '../../providers/custom-storage/custom-storage';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	tab1Root = HomePage;
	tab2Root = PreregistroPage;
	tab3Root = LocalizacionPage;
	tab4Root = AliadosPage;
	tab5Root = ComunidadPage;
	tab6Root = QuienesSomosPage;
	tab7Root = LoginPage;
	myIndex: number;

	campanaslists: any;
	userslists: any;
	userFullname: any;
	userEcoins: any;
	preregistersCount: any;
	myObject: any;
	isNotification: boolean;

	constructor(
		public platform: Platform,
		public navCtrl: NavController,
		public data: DataProvider,
		public globalDataProvider: GlobalDataProvider,
		private app: App,
		public pushNotification: NotificationOneSignalProvider,
		public oneSignal: OneSignal,
		public customStorage: CustomStorageProvider
	) {
		this.myObject = [];
		this.campanaslists = [];

		if (!this.customStorage.events.value) {
			this.customStorage.get('campanas').then((res) => {
				console.log('RESSS', res);
				if (res) {
					this.campanaslists = res;
				} else {
				}
			});
		}

		// let item = JSON.parse(localStorage.getItem('campanas'));
		// console.log('ITEM', item);

		// this.campanaslists = item;

		// console.log('campanaslist', this.campanaslists);

		if (globalDataProvider.userId == 0) {
			// no se ha logueado
			this.navCtrl.push(LoginPage);
		}
		this.userFullname = globalDataProvider.fullname;
		this.userEcoins = globalDataProvider.ecoins;
		this.preregistersCount = globalDataProvider.preregistersCount;
	}

	ionViewDidLoad() {
		// console.log('IS FALSE? ', this.isNotification);
		// if(this.isNotification) {
		//   this.customStorage.events.subscribe((res) => {
		//     if (res) {
		//       this.campanaslists.push(res);
		//       console.log('campanslist', this.campanaslists);
		//     }
		//   });
		// }
	}
	ionViewWillEnter() {
    console.log('ahhh???', this.customStorage.events);


		if (this.customStorage.events.value) {
			this.customStorage.events.subscribe((res) => {
				if (res) {
          if(this.campanaslists.indexOf(res) >= 0) {
            console.log('mismo payload');
          }else {
            this.campanaslists.push(res);
            console.log('campanslist', this.campanaslists);
          }
				}
      });

		}
	}

	itemClicked(item): void {
		this.navCtrl.push(DetallePage, item);
	}
}
