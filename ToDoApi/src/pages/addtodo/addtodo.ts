import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, DateTime } from 'ionic-angular';
import { DynamoProvider } from '../../providers/dynamo/dynamo';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { SchemaProvider } from '../../providers/schema/schema';
import { dateDataSortValue } from '../../../node_modules/ionic-angular/umd/util/datetime-util';
import { ToastController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

@IonicPage()
@Component({
  selector: 'page-addtodo',
  templateUrl: 'addtodo.html',
})
export class AddtodoPage {

  //public todos ;
  public Subject: string;
  public Body: string;
  public StartDate: DateTime;
  public DueDate: DateTime;
  // public DateCompleted : boolean;

  public form: FormGroup;
  public todo : any;
  public mess: string;
  public entity : any;
  public date = new Date();

  public requiredProperties : any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    protected DynamoProvider: DynamoProvider,
    protected schemaProvider : SchemaProvider,
    private toastCtrl: ToastController,
    private calendar: Calendar
  ) {
      this.entity = this.navParams.get('item');
      this.schemaProvider.requiredProperties(this.entity);
      this.todo = this.schemaProvider.requiredProps;
      console.log(this.todo);
    
      this.schemaProvider.properties['properties'].forEach(data => {
          if(this.todo.hasOwnProperty(data['name'])){
            if(data['type'].hasOwnProperty("size")){
              this.form = new FormGroup({
                Property: new FormControl('', Validators.compose([
                  Validators.required,  
                  Validators.maxLength(data['type.size'])       
                ]))
              });
            }
            else{
              this.form = new FormGroup({
                Property: new FormControl('', Validators.compose([
                  Validators.required,        
                ]))
              });
            }
          }
        });
  }

  // DOES NOT WORK ???
  minStartDate() {
   return this.date;
  }
  
  minDueDate() {
    return this.date;
  }

  ///////////////////////
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtodoPage');
  }

  presentToast(mess) {
    let toast = this.toastCtrl.create({
      message: mess,
      duration: 1000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  postItem() {
    console.log(this.todo);
    this.DynamoProvider.postItem(this.entity,this.todo)
      .subscribe((res) => {
        console.log(res);
        if(res['success'] == true){
            this.mess = 'Added successfully';
            this.presentToast(this.mess);
            if(this.entity == 'Activity')
            {
              this.calendar.createEvent(this.todo['Subject'], this.todo['Body'], new Date(this.todo['DateStarted']).toDateString(), new Date(this.todo['DueDate'])).then(
                (msg) => {
                  let alert = this.alertCtrl.create({
                    title: 'Success!',
                    subTitle: 'Activity saved successfully',
                    buttons: ['OK']});
                  console.log(msg);
                 
                  alert.present();
                  //this.navCtrl.pop();
                },
                (err) => {
                  let alert = this.alertCtrl.create({
                    title: 'Failed!',
                    subTitle: err,
                    buttons: ['OK']
                  });
                  console.log(err);
                  alert.present();
                }
              );
            }
        }
        else{
          this.mess = 'Error! Unable to add';
          this.presentToast(this.mess);
        }
      });
    this.navCtrl.pop();

  }


}
