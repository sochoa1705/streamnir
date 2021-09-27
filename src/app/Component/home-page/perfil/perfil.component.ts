import { Component, OnInit } from '@angular/core';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  constructor(
    public dataPagePresenterService: DataPagePresenterService,

  ) { }

  id:any = "mnuPerfil";
  showOption(ids:any) {
    this.id = ids;
    //console.log(this.id);
  }

  agregaTelefono = false;
  showAgregaTelefono(valElem:boolean){
    this.agregaTelefono = valElem;
    //console.log(this.agregaTelefono);
  }

  agregaEmail = false;
  showAgregaEmail(valElem:boolean){
    this.agregaEmail = valElem;
    //console.log(this.agregaEmail);
  }

  cambiarPass = false;
  showCambiarPass(valElem:boolean){
    this.cambiarPass = valElem;
    //console.log(this.cambiarPass);
  }

  agregaTarjeta = false;
  showAgregaTarjeta(valElem:boolean){
    this.agregaTarjeta = valElem;
    //console.log(this.agregaTarjeta);
  }

  agregaPasajero = false;
  showAgregaPasajero(valElem:boolean){
    this.agregaPasajero = valElem;
    //console.log(this.agregaPasajero);
  }


  ngOnInit(): void {
  }

}
