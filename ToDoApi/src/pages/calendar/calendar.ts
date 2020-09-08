import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { DynamoProvider } from '../../providers/dynamo/dynamo';
import {AddtodoPage} from '../addtodo/addtodo';
import { SchemaProvider } from '../../providers/schema/schema';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@NgModule({
  providers: [
    Calendar
  ],
  declarations: [
    AddtodoPage
  ],
  entryComponents: [
    AddtodoPage
  ],
})
@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  date= new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;

  public entity: any;
  public todos: any;
  eventList: any;
  selectedEvent: any;
  isSelected: any;

  constructor(public navCtrl: NavController,
     private calendar: Calendar, 
     private plt: Platform,
     protected dynamoProvider: DynamoProvider,
     protected schemaProvider : SchemaProvider,
     public  navParams : NavParams) {
      
      this.entity = 'Activity';
      this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

      this.getDaysOfMonth();
      this.getItem();
      this.loadEventThisMonth();
  }
  
  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    console.log(this.currentMonth);
    console.log(this.currentYear);
    
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
    console.log(this.currentDate);

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    console.log(firstDayThisMonth);
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    console.log(prevNumOfDays);
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }
    
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    console.log(thisNumOfDays);
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }
    
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    console.log(lastDayThisMonth);
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    console.log(totalDays);
    if(totalDays<36) {
      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
    console.log(this.date);
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
    console.log(this.date);
  }

  ///////////////////////////
  /////  TO DO //////////////
  //////////////////////////

  getItem(){
    this.dynamoProvider.getItem(this.entity)  
      .subscribe(data => {
      this.todos = data['data'];
      console.log(this.todos);
    } )
    ;
  
  }

  loadEventThisMonth() {
    this.eventList = new Array();
    var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var endDate = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0);
    console.log(startDate);
    console.log(endDate);
    
    this.calendar.listEventsInRange(startDate, endDate).then(
      (msg) => {
        msg.forEach(item => {
          this.eventList.push(item);
        });
      },
        (err) => {
          console.log(err);
        }
      );
      console.log(this.eventList);
    }

    checkEvent(day) {
      var hasEvent = false;
      var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
      var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
      
      this.eventList.forEach(event => {
        if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
          hasEvent = true;
        }
      });
      return hasEvent;
    }

    selectDate(day) {
      this.isSelected = false;
      this.selectedEvent = new Array();
      var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
      var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
      this.eventList.forEach(event => {
        if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
          this.isSelected = true;
          this.selectedEvent.push(event);
        }
      });
    }

////////////////////////////

  addTodoPage(){
    let item = this.entity
    this.navCtrl.push(AddtodoPage, {item: item});
  }

}
