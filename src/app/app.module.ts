import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { PreregistroPage } from '../pages/preregistro/preregistro';
import { LocalizacionPage } from '../pages/localizacion/localizacion';
import { AliadosPage } from '../pages/aliados/aliados';
import { ComunidadPage } from '../pages/comunidad/comunidad';
import { QuienesSomosPage } from '../pages/quienes-somos/quienes-somos';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import { RecuperarPage } from '../pages/recuperar/recuperar';
import { CambiarContrasenaPage } from '../pages/cambiar-contrasena/cambiar-contrasena';
import { TermsPage } from '../pages/terms/terms';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { DetallePage } from '../pages/detalle/detalle';
import { CanjeoPage } from '../pages/canjeo/canjeo';
import { InstruccionesPage } from '../pages/instrucciones/instrucciones';
import { CameringPage } from '../pages/camering/camering';
import { ScanningPage } from '../pages/scanning/scanning';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { EmailComposer } from '@ionic-native/email-composer';
import { BackgroundGeolocation} from '@ionic-native/background-geolocation';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Flashlight } from '@ionic-native/flashlight';
import { EcoboxApp } from './app.component';
/*Servicios-Providers*/
import { DataProvider } from '../providers/data-service/data-service';
import { CampanasService } from '../services/campanas.service';
import { CompartirService } from '../services/compartir.service';
import { GlobalDataProvider } from '../providers/global-data/global-data';
import { IonicStorageModule } from '@ionic/storage';

//plugin one signal
import { OneSignal } from '@ionic-native/onesignal';


import { NotificationOneSignalProvider } from '../providers/notification-one-signal/notification-one-signal';
import { CustomStorageProvider } from '../providers/custom-storage/custom-storage';



@NgModule({
  declarations: [
    EcoboxApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    PreregistroPage,
    LocalizacionPage,
    AliadosPage,
    ComunidadPage,
    QuienesSomosPage,
    TabsControllerPage,
    RecuperarPage,
    CambiarContrasenaPage,
    TutorialPage,
    TermsPage,
    DetallePage,
    CanjeoPage,
    InstruccionesPage,
    ScanningPage,
    CameringPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(EcoboxApp, {
    // tabsHideOnSubPages: true
    }),
    BrowserModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    EcoboxApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    PreregistroPage,
    LocalizacionPage,
    AliadosPage,
    ComunidadPage,
    QuienesSomosPage,
    TabsControllerPage,
    RecuperarPage,
    CambiarContrasenaPage,
    TutorialPage,
    TermsPage,
    DetallePage,
    CanjeoPage,
    InstruccionesPage,
    ScanningPage,
    CameringPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Flashlight,
    GoogleMaps,
    Geolocation,
    EmailComposer,
    BackgroundGeolocation,
    DataProvider,
    CampanasService,
    CompartirService,
    GlobalDataProvider,
    Geolocation,
    GoogleMaps,
    AndroidPermissions,
    OneSignal,
    NotificationOneSignalProvider,
    CustomStorageProvider
  ]
})
export class AppModule { }
