import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import {Carne} from '../../models/carne'
import 'rxjs/add/operator/map';

@Injectable()
export class CarneProvider {

  data: any;
  public loader;
  constructor(private http: Http, public loadingCtrl: LoadingController) {
  	this.data = null;
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

  }

  load(){
    
    this.loader.present()

  	if(this.data){
  		return Promise.resolve(this.data);
  	}

  	return new Promise(resolve => {

  		var self_loader = this.loader;

  		this.http.get('https://blooming-retreat-58545.herokuapp.com/carne')
  		.map(res => <Array<Carne>>res.json())
  		.subscribe
  		(
  			carnes => {
	  			this.data = carnes;
	  			resolve(this.data);
  			},
  			 function(error) { console.log("Error happened" + error)},
  			 function() { console.log("the subscription is completed"); 
         self_loader.dismiss();
       }
  		);
  	});
  }

  loadDetalles(id:number){

    this.loader.present()

    return new Promise<Carne>(resolve =>{

      var self_loader = this.loader;

      this.http.get('https://blooming-retreat-58545.herokuapp.com/carne/'+id)
      .map(res => <Carne>(res.json()))
      .subscribe(carne=>{
        resolve(carne);
      },
		    function(error) { console.log("Error happened" + error)},
		    function() { console.log("the subscription is completed"); 
        self_loader.dismiss();
      }      
      );
    });
  }

  searchCarne(searchParam: string){

  	var self_loader = this.loader;

  	return new Promise<Array<Carne>>(resolve =>{
  		this.http.get('http://blooming-retreat-58545.herokuapp.com/carne/buscar/'+searchParam)
  		.map(res => <Array<Carne>>(res.json().items))
  		.subscribe(carnes => {
  			resolve(carnes);
  		},
		function(error) { console.log("Error happened" + error)},
		function() { console.log("the subscription is completed"); self_loader.dismiss()}
  		);

  	});
  }  

  newCarne(carne:Object){

  	return new Promise<Array<Carne>>(resolve =>{
  		this.http.post('https://blooming-retreat-58545.herokuapp.com/carne', carne)
      .map(res => <Array<Carne>>res.json())
      .subscribe
      (
        carnes => {
          this.data = carnes;
          resolve(this.data);
        },
        function(error) { console.log("Error happened" + error)},
        function() { console.log("the subscription is completed")}
      );

  	});

  }

}

