import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ModalPage} from '../pages/modal-todo/modal-todo'
import { HttpClientModule } from '@angular/common/http';
//import { HttpClient } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DynamoProvider } from '../providers/dynamo/dynamo';
import { ShowAllPage } from '../pages/show-all/show-all';
import { CalendarPage } from '../pages/calendar/calendar';
import { AddtodoPage } from '../pages/addtodo/addtodo';
import { SchemaProvider } from '../providers/schema/schema';
import { Calendar } from '../../node_modules/@ionic-native/calendar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShowAllPage,
    CalendarPage,
    ListPage,
    AddtodoPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShowAllPage,
    CalendarPage,
    ListPage,
    AddtodoPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DynamoProvider,
    HomePage,
    SchemaProvider,
    Calendar
  ]
})
export class AppModule {}
