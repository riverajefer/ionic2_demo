import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Carne } from '../../models/carne'
import { Observable } from 'rxjs/Observable';
import { CARNES } from '../../pages/carnes/mock-carne';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class CarneProvider {

  carnes: Carne[] = CARNES;
  data: any;
  public loader;

  constructor(private http: Http, public loadingCtrl: LoadingController) {
  	this.data = null;
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

  }

  carnesUrl = 'https://blooming-retreat-58545.herokuapp.com/carne';  // URL to web API

  getCarnes (): Observable<Carne[]> {
    return this.http.get(this.carnesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addCarne (carne:Object): Observable<Carne> {
    return this.http.post(this.carnesUrl, carne)
    .map(this.extractDataNew)
    .catch(this.handleError);

  };

  private extractData(res: Response) {
    let body = res.json();
    this.carnes = body.data;
    return body.data || { };
  }


  private extractDataNew(res: Response) {
    let body = res.json();
    console.log(body)
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  

  getAll(): Carne[]{
      return this.carnes;
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

}

