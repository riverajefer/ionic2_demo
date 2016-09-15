import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Carne} from '../../models/carne'

@Injectable()
export class CarneProvider {

  data: any;
  constructor(private http: Http, public loadingCtrl: LoadingController) {
  	this.data = null;
  }

  load(){
    
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present()

  	if(this.data){
  		return Promise.resolve(this.data);
  	}

  	return new Promise(resolve => {
  		this.http.get('https://blooming-retreat-58545.herokuapp.com/carne')
  		.map(res => <Array<Carne>>res.json())
  		.subscribe
  		(
  			carnes => {
	  			this.data = carnes;
	  			resolve(this.data);
  			},
  			function(error) { console.log("Error happened" + error)},
  			function() { console.log("the subscription is completed"); loader.dismiss();}
  		);
  	});
  }

  loadDetalles(id:number){
    console.log(id)
    return new Promise<Carne>(resolve =>{
      this.http.get('https://blooming-retreat-58545.herokuapp.com/carne/'+id)
      .map(res => <Carne>(res.json()))
      .subscribe(carne=>{
        resolve(carne);
      });
    });
  }
}

