import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';

import { DynamoProvider } from '../../providers/dynamo/dynamo';
import { SchemaProvider } from '../../providers/schema/schema';
import { AlertController } from 'ionic-angular';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import {HomePage } from '../home/home';
import { ModalController, Platform, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-modal-todo',
  templateUrl: 'modal-todo.html'
})

export class ModalPage{

  public Subject : string;
  public Body: string;
  public StartDate : DateTime;
  public DueDate : DateTime;
 // public DateCompleted : boolean;

 //public todo;
  //public todo: object[] ;
  
  
 // notDeleted: any;
  public item: any;
  public mess : string;
  public entity : any;
  public form: FormGroup;
  public setProps : Object = {};
  
  constructor(
    public platform: Platform,
    public viewCtrl: ViewController, 
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    protected DynamoProvider: DynamoProvider,
    protected schemaProvider : SchemaProvider,
    private toastCtrl: ToastController
  ) {
    this.item = this.navParams.get('item');

    console.log(this.item);
    console.log(this.entity);
  }

  presentToast(mess) {
    let toast = this.toastCtrl.create({
      message: mess,
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  delete(id) {
    const confirm = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure you want to discard changes?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(id);
          }
        }
      ]
    });
    confirm.present();
  }
  deleteItem(id){
    this.entity = this.item.item['_es'];
    console.log(this.item.item['_es']);
    this.DynamoProvider.deleteItem(this.entity, id, this.item)
      .subscribe((res) => {
        console.log(res);
        if(res['success'] == true){
            this.mess = 'Deleted successfully';
            this.presentToast(this.mess);
        }
        else{
          this.mess = 'Error! Unable to delete';
          this.presentToast(this.mess);
        }
      })
    ;
    //this.notDeleted = false;
    this.dismissPage();
  }

  editItem(propName, data){
    console.log(data);
    console.log(this.DynamoProvider.res['data']);
    this.setProps[propName] = data;
  }

  isEmpty(){
    if(Object.keys(this.setProps).length == 0)
      return true;
    else
      return false;
  }
  update(){
    console.log(this.setProps);
    this.entity = this.item.item['_es'];
    console.log(this.item.item);

    this.DynamoProvider.putItem(this.entity, this.setProps, this.item.item)  
      .subscribe(data => {
      this.item = data['data'];
      console.log(this.item);
      console.log(data);
      if(data['success'] == true){
        this.mess = 'Edited successfully';
        this.presentToast(this.mess);
      }
      else{
        this.mess = 'Error! Unable to edit';
        this.presentToast(this.mess);
      }
      
    } );
    this.dismissPage();
  }

  discard() {
    const confirm = this.alertCtrl.create({
      title: 'Discard',
      message: 'Are you sure you want to discard changes?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.dismissPage();
          }
        }
      ]
    });
    confirm.present();
  }

  goBack(){
    if(this.isEmpty())
    {
      this.dismissPage();
    }
    else {
      this.discard();
    }
  }
  save(){
    const confirm = this.alertCtrl.create({
      title: 'Save',
      message: 'Are you sure you want to save changes?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.dismissPage();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.update()
          }
        }
      ]
    });
    confirm.present();
}



  dismissPage() {
    //this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }
}
