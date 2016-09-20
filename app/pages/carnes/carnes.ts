import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Platform, LoadingController } from 'ionic-angular';
import { CarneProvider } from '../../providers/carne-provider/carne-provider';
import { CarneDetallesPage } from '../carne-detalles/carne-detalles';
import { Carne } from '../../models/carne'
import { ModalPage } from '../modal/modal';
//import { CARNES } from '../../pages/carnes/mock-carne';

@Component({
  templateUrl: 'build/pages/carnes/carnes.html',
  providers: [CarneProvider],
})

export class CarnesPage {

  carnes: Carne[];

  newCarne: Carne = new Carne();  

  errorMessage:any;
  
  public loader;

  constructor(private navCtrl: NavController, 
    private carneProvider: CarneProvider, 
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
    ) {
    this.getCarnes();
    this.navCtrl = navCtrl;

    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
  }


  getCarnes() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });    
    loader.present();
    this.carneProvider.getCarnes()
    .subscribe(carnes => {this.carnes = carnes; loader.dismiss()},  error =>  this.errorMessage = <any>error );
  }

  presentModal() {

    let modal = this.modalCtrl.create(ModalPage, { userId: 8675309 });

    modal.onDidDismiss(carne => {
      if(carne!=null){
          this.loader.present();
          this.carneProvider.addCarne(carne)
          .subscribe(
            carne  =>{
              this.carnes.unshift(carne);
              this.loader.dismiss();
            },
            error =>  this.errorMessage = <any>error);    
      }
    }); 

    modal.present();    
  }

  goToDetalles(event, id){
    this.navCtrl.push(CarneDetallesPage,{
      id:id
    });
  }

}

