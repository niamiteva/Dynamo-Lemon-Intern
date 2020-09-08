import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';

@Injectable()
export class SchemaProvider {

  apiKey = 'Bearer cbf36xoWciJrl3blyfG7Szgyx4aqk0WOImcdO0YWfqQENV3S_rPyZWNW6q5osTw-e60WfNfY-Eu7CRYf6akbOB9Q1RYMx99GSp1wF_-ApVE';
  url;
  entity;

  public properties : object[];
  //public result : object[]
  public requiredProps: any;

  public propToDisplay : any;

  public editProps: object[];

  constructor(public http: HttpClient) {
    this.url = 'https://apiuat.dynamosoftware.com/api/v2.0/entity/';
    ///this.entity = 'Activity';

  }

  getSchema(entity){
    let header = new HttpHeaders()
      .set('Authorization', this.apiKey)
      .set('Content-Type', 'application/json');


    const options = {
      headers: header
    };

    return this.http.get(this.url+entity+'/schema', options)
      .do(result => {
        console.log(result['data']);
        this.properties = result['data'];
      });

  }


  notForTheUser(data){
    if(data.hasOwnProperty('readOnly')){


      if(data['readOnly'] === true || data.type['name']==='ref' || data.type['name']==='alias' || data.type['name']==='formula'){
        return true;
      }
      else return false;

    }
    else if( data.type['name']==='ref' || data.type['name']==='alias' || data.type['name']==='formula'){
      return true;
    }
    else  return false;
    
  }

  formatInputType(data){
    if(data === "datetime")
      return "datetime-local";
    else if(data === "bool")
      return "checkbox";
  }

  requiredProperties(entity){

    if(entity === 'Activity'){
        this.requiredProps = {
          Subject: '',
          Body: '',
          DateStarted: '',
          DueDate: ''
        }
    }
    else if(entity === 'Contact'){
      this.requiredProps ={
        FirstName : '',
        LastName:'',
      }
    
  }
  }

  isRequired(data){
    if(this.requiredProps.hasOwnProperty(data.name))
    {
      return false;
    }
    else
      return true;
  }

  propertiesToDisplay(entity){

    if(entity === 'Activity'){
        this.propToDisplay = {
          prop1: 'Subject',
          prop2: 'DueDate'
        }
    }
    else if(entity === 'Contact'){
      this.propToDisplay ={
        prop1: 'FirstName',
        prop2: 'LastName'
      }
    }

  }

}


