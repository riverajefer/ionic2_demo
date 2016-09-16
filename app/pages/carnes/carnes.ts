import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Platform } from 'ionic-angular';
import { CarneProvider } from '../../providers/carne-provider/carne-provider';
import { CarneDetallesPage } from '../carne-detalles/carne-detalles';
import {Carne} from '../../models/carne'

@Component({
  templateUrl: 'build/pages/carnes/carnes.html',
  providers: [CarneProvider]
})
export class CarnesPage {
  
  carnes: Carne[];

  constructor(private navCtrl: NavController, private carneProvider: CarneProvider, public modalCtrl: ModalController) {

  	this.loadAll()

  }

  loadAll(){
  	 this.carneProvider.load().then(
  		carnes => {this.carnes = carnes.data
  	});
  }

  goToDetalles(event, id){
  	this.navCtrl.push(CarneDetallesPage,{
  		id:id
  	});
  }


  search(searchTerm){

  	let term = searchTerm.target.value;
  	console.log(term)
 	if (term.trim() == '' || term.trim().length < 3) {
  		term = 'all';
  	}

	this.carneProvider.searchCarne(term)
  		.then(carnes => this.carnes =carnes)

  }

   presentModal() {
   	console.log('Modal');
    let modal = this.modalCtrl.create(ModalsContentPage);
    modal.present();
  }

}


@Component({
    templateUrl: 'build/pages/carnes/modal-content.html',
    providers: [CarneProvider]
})

class ModalsContentPage {
  cp:CarnesPage;
  carnes: Carne[];

  constructor(
      public platform: Platform,
      public viewCtrl: ViewController,
      private carneProvider: CarneProvider
  ) { }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  carne = {}

  submitForm(){
  	this.carneProvider.newCarne(this.carne).then( carnes =>  this.carnes = carnes);
  	this.dismiss();
  }

}