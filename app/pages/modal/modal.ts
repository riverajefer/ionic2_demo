import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ModalController } from 'ionic-angular';
import { CarneProvider } from '../../providers/carne-provider/carne-provider';
import { Carne } from '../../models/carne'
import { CarnesPage } from '../carnes/carnes';
import { CARNES } from '../../pages/carnes/mock-carne';

@Component({
  templateUrl: 'build/pages/modal/modal.html',
  providers: [CarneProvider],
  //directives: [CarnesPage]
})
export class ModalPage {
  newCarne: Carne = new Carne();

  constructor(private navCtrl: NavController,  
  	private carneProvider: CarneProvider, 
  	public viewCtrl: ViewController,
	  public modalCtrl: ModalController){

    this.newCarne.id = 5;
    this.newCarne.titulo = "Jamon ok 8";
    this.newCarne.descripcion = "Lorem ipsum dolor sit amet";
    this.newCarne.valor = 3;
  }

  addNow(event){
  	event.preventDefault();
		console.log("Add")
  	
    //let class1Instance = new CarnesPage(this.navCtrl, this.carneProvider, this.modalCtrl);
  	//class1Instance.addInfo(this.newCarne);
  	
    this.dismiss(this.newCarne);
  }


 dismiss(envioCarne:Carne) {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(envioCarne);
  }
  cerrar(){
   this.viewCtrl.dismiss(null); 
  }

}
