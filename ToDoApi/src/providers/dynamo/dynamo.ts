import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
//import { Headers, Http, RequestOptions} from '@angular/http';

/*
  Generated class for the DynamoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DynamoProvider {
  
  //res = {};
  apiKey = 'Bearer cbf36xoWciJrl3blyfG7Szgyx4aqk0WOImcdO0YWfqQENV3S_rPyZWNW6q5osTw-e60WfNfY-Eu7CRYf6akbOB9Q1RYMx99GSp1wF_-ApVE';
  url;
  entity;

  public properties : object[];
  //public result : object[]
  public res: object[];

  constructor(public http: HttpClient) {
    console.log('Hello DynamoProvider Provider');
    this.url = 'https://apiuat.dynamosoftware.com/api/v2.0/entity/';
   //this.entity = 'Activity';

  }

  // getSchema(entity){
  //   let header = new HttpHeaders()
  //     .set('Authorization', this.apiKey)
  //     .set('Content-Type', 'application/json');


  //   const options = {
  //     headers: header
  //   };

  //   return this.http.get(this.url+entity+'/schema', options)
  //     .do(result => {
  //       console.log(result['data']);
  //       this.properties = result['data'];
  //     });

  // }

  getItem(entity) {
    let header = new HttpHeaders()
      .set('Authorization', this.apiKey)
      .set('Content-Type', 'application/json');


    const options = {
      headers: header
    };

    return this.http.get(this.url+entity, options)
      .do(res => {
        console.log(res['data']);
        this.res = res['data'];
      });
    //.map(res => res.json()); //+'.json'
  }

  //todo getById;
  getItemById(entity, id) {
    let header = new HttpHeaders()
      .set('Authorization', this.apiKey)
      .set('Content-Type', 'application/json');


    const options = {
      headers: header
    };


    return this.http.get(this.url+entity+'/'+id, options)
      .do(res => {
        console.log(res['data']);
        this.res = res['data'];
      });
  }


  deleteItem(entity, id, item) {
    let header = new HttpHeaders()
      .set('Authorization', this.apiKey)
      .set('Content-Type', 'application/json');


    const options = {
      headers: header
    };
    console.log(this.res)
    console.log(item.item)
    var index = this.res.indexOf(item.item);
    console.log(index);
    return this.http.delete(this.url+entity+'/'+id, options)
      .do(data => {
        console.log(this.res);
        this.res.splice(index, 1);
      });
  }

  postItem(entity, res) {
    let header = new HttpHeaders()
      .set('Authorization', this.apiKey)
      .set('Content-Type', 'application/json');

    const options = {
      headers: header
    };

    return this.http
      .post(this.url+entity, res, options)
      .do(res => {
        this.res.push(res['data']);
        console.log(res['data']);
        console.log(this.res);
      });
  }

  putItem(entity, data,item) {
    let header = new HttpHeaders()
      .set('Authorization', this.apiKey)
      .set('Content-Type', 'application/json');

    const options = {
      headers: header
    };
    
    console.log(item);
    var index = this.res.indexOf(item);
    console.log(index);
    console.log(data);
    console.log(item['_id']);
    return this.http
      .put(this.url+entity +'/'+item['_id'], data, options)
      .do(res => {
       for(var key in data) {
          this.res[index][key] = data[key];
        }
      });
  }

  updateItem(entity, id, res) {
    let header = new HttpHeaders()
      .set('Authorization', this.apiKey)
      .set('Content-Type', 'application/json');

    const options = {
      headers: header
    };

    return this.http
      .put(this.url+entity+'/'+id, res, options)
      .do(res => {
        console.log(res);
      });
  }
}
