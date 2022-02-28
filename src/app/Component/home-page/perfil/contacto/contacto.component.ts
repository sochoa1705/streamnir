import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/Services/accounts.service';
import { ContactoService } from './contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  agregaTelefono = false;
  agregaEmail = false;

  idUsuario: number;


  constructor(public accountService: AccountsService, public contactoService: ContactoService) {
    this.idUsuario = this.accountService.getUserStorage().id;
  }

  ngOnInit(): void {

    this.getInformation()

  }

  getInformation() {
    this.contactoService.getInformation(this.idUsuario).subscribe(data => {
      console.log(data);
    })
  }




  cambiarPass = false;
  showCambiarPass(valElem: boolean) {
    this.cambiarPass = valElem;
    //console.log(this.cambiarPass);
  }


  showAgregaEmail(valElem: boolean) {
    this.agregaEmail = valElem;
    //console.log(this.agregaEmail);
  }

  showAgregaTelefono(valElem: boolean) {
    this.agregaTelefono = valElem;
    //console.log(this.agregaTelefono);
  }

}
