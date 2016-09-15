import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { CarneProvider } from '../../providers/carne-provider/carne-provider';
import {Carne} from '../../models/carne'

@Component({
  templateUrl: 'build/pages/carne-detalles/carne-detalles.html',
  providers: [CarneProvider]
})
export class CarneDetallesPage {

  carne: Carne = new Carne;	
  id: number;
  constructor(private navCtrl: NavController, navParams: NavParams, carneProvider:CarneProvider ) {
  	this.id = navParams.get('id');
  	console.log(this.id);

  	carneProvider.loadDetalles(this.id).then(
  		carne => {this.carne = carne}
  	)
  }


}
