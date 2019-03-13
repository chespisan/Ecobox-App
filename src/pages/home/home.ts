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

	constructor(
		public platform: Platform,
		public navCtrl: NavController,
		public data: DataProvider,
		public globalDataProvider: GlobalDataProvider,
		private app: App,
		public pushNotification: NotificationOneSignalProvider,
		public oneSignal: OneSignal
	) {
		this.myObject = [];

		if (globalDataProvider.userId == 0) {
			// no se ha logueado
			this.navCtrl.push(LoginPage);
		}
		this.userFullname = globalDataProvider.fullname;
		this.userEcoins = globalDataProvider.ecoins;
		this.preregistersCount = globalDataProvider.preregistersCount;
	}

	ngDoCheck() {
		let getLocalStorage = JSON.parse(localStorage.getItem('campanas'));
		console.log('GET LS do check', getLocalStorage);
		//this.campanaslists = getLocalStorage;
	}

	ionViewDidLoad() {
		/** One Signal Service */
		this.init_notification();
		let getLocalStorage = JSON.parse(localStorage.getItem('campanas'));
		this.campanaslists = getLocalStorage;

		//this.campanaslists = this.data.campanas;
	}

	itemClicked(item): void {
		this.navCtrl.push(DetallePage, item);
	}

	init_notification() {
		//this.campanaslists = {};

		if (this.platform.is('cordova')) {
			console.log('INIT NOTIFICATION');
			this.oneSignal.startInit('217bd436-a28b-4c8b-8317-d9b03d0fc3c8', '512846988611');
			this.oneSignal.handleNotificationReceived().subscribe((res) => {
				console.log('notification received', res.payload.additionalData);
			});
			this.oneSignal.handleNotificationOpened().subscribe((res) => {
				console.log('notification opened', res.notification.payload.additionalData);


				let myArray = [];

				if (localStorage.getItem('campanas')) {
					let getLocalStorage = JSON.parse(localStorage.getItem('campanas'));
					let response = res.notification.payload.additionalData;
					getLocalStorage.push(response);
					this.campanaslists = getLocalStorage;

					localStorage.setItem('campanas', JSON.stringify(getLocalStorage));
				} else {
					this.myObject.push(res.notification.payload.additionalData);
					console.log('this my object', this.myObject);
					localStorage.setItem('campanas', JSON.stringify(this.myObject));
				}
			});

			this.oneSignal.endInit();
		} else {
			console.log('One Signal not Browser Config');
		}
	}
}
