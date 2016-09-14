import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { CarneProvider } from '../../providers/carne-provider/carne-provider';

import {Carne} from '../../models/carne'

@Component({
  templateUrl: 'build/pages/carnes/carnes.html',
  providers: [CarneProvider]
})
export class CarnesPage {
  
  carnes: Carne[];

  constructor(private navCtrl: NavController, carneProvider: CarneProvider) {

  	carneProvider.load().then(
  		carnes => {this.carnes = carnes.data
  	});
  	
  }

}
