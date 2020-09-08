import { Component,ViewChild } from '@angular/core';
import { Nav, NavController, DateTime, Item} from 'ionic-angular';
import { NgModule } from '@angular/core';
// import {DateTime } from 'ionic-angular';
//import { HttpClientModule } from '@angular/common/http';
import { DynamoProvider } from '../../providers/dynamo/dynamo';
import { SchemaProvider } from '../../providers/schema/schema';
import {AddtodoPage} from '../addtodo/addtodo';
import {ModalPage} from '../modal-todo/modal-todo';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})

@NgModule({
  declarations: [
    AddtodoPage,
    ModalPage
  ],
  entryComponents: [
    AddtodoPage,
    ModalPage
  ],
})

export class HomePage{ 

  @ViewChild(Nav) nav: Nav;
  //addTodoPage = AddtodoPage;
  modalPage = ModalPage;

  //notDeleted: any;

  public todos = {
    DateCompleted :'',
  };
  public entity: any;
  public item : any;
  public new : any;
  public itemsToSearch: string[] = [];
  public index: any = [];
  public properties:object[];
  public temp :  object[];

  toDisplay : any;

  constructor(
    public navController : NavController,
    protected  DynamoProvider: DynamoProvider,
    protected schemaProvider : SchemaProvider,
    public modalCtrl: ModalController,
    public  navParams : NavParams
    ) {
      this.entity = this.navParams.get('item');
  
      if(!this.entity) this.entity = 'Activity'; //for now 
      this.schemaProvider.propertiesToDisplay(this.entity);
      this.toDisplay = this.schemaProvider.propToDisplay;

      console.log(this.entity);
      this.getItem();
      this.getSchema();

    }     

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
  
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 300);
    }
                
  getItem(){
    this.DynamoProvider.getItem(this.entity)  
      .subscribe(data => {
      this.todos = data['data'];
      this.temp = data['data'];
      console.log(this.todos);
    } )
    ;
  
  }

  getSchema(){
    this.schemaProvider.getSchema(this.entity)  
      .subscribe(data => {
      this.properties = data['data'];
      console.log(this.properties);
    } )
    ;
  }   

  
  updateDateCompleted(data){
    this.item = data;
    console.log(data);
    console.log(data['DateCompleted']);
    let date = new Date().toISOString();

    if(data['DateCompleted'] == null) { 
      console.log(date);     
      data['DateCompleted'] = date;  
      console.log(data['DateCompleted'])  ; 
    }
    else {
      console.log(null); 
      data['DateCompleted'] = null;
      console.log(data['DateCompleted']);
    }
    //item['LastModified'] = date;
    console.log(date);
    console.log(data['LastModified']);

    this.new = {
      Subject : data.Subject,
      Body : data.Body,
      DateStarted : data.DateStarted,
      DueDate : data.DueDate,
      DateCompleted : data.DateCompleted
    };

    this.DynamoProvider.putItem(this.entity, this.new, this.item)  
      .subscribe(data => {
      this.properties = data['data'];
      console.log(this.properties);
    } );
  }

  searchItems(ev: any) {
    // Reset items back to all of the items
    console.log(this.toDisplay['prop1']);
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    var i=0;
    if (val && val.trim() != '') {
      this.DynamoProvider.res = this.DynamoProvider.res.filter((item) => {
        return (item[this.toDisplay['prop1']].toLowerCase().indexOf(val.toLowerCase()) > -1); 
      });
      console.log(this.DynamoProvider.res);
    }
  }

  cancelSearch(){
    this.DynamoProvider.res = this.temp;
    console.log(this.DynamoProvider.res);
  }

  addTodoPage(){
    let item = this.entity
    this.navController.push(AddtodoPage, {item: item});
  }

  openTodo(item){
    console.log(item);
    this.navController.push(ModalPage, {item:item})
  }

}
  

