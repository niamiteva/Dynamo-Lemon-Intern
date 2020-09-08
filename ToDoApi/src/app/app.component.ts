import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ShowAllPage } from '../pages/show-all/show-all';
import { CalendarPage } from '../pages/calendar/calendar';

@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;
  pages: Array<{title: string, component: any, icon: string, entity: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      {title: 'Activities', component: HomePage , icon: 'clipboard', entity : 'Activity'},
      {title: 'Contacts', component: HomePage, icon: 'contacts', entity : 'Contact'},
      {title: 'Calendar', component: CalendarPage, icon: 'calendar', entity : 'Activity'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    let item = page.entity;
    console.log(page.entity)
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, {item:item});
  }
  
}
