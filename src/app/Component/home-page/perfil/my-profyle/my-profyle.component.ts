import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-my-profyle',
  templateUrl: './my-profyle.component.html',
  styleUrls: ['./my-profyle.component.scss']
})
export class MyProfyleComponent implements OnInit {

  userStorage: UserStorage;

  constructor(public accountService: AccountsService,
    private router: Router) { }

  ngOnInit(): void {
    this.userStorage = this.accountService.getUserStorage();
  }


  toggleModalEliminar() {
    const modal = document.getElementById("ModalEliminaCorreo");

    if (!modal) {
      return;
    }

    bootstrap.Modal.getOrCreateInstance(modal).toggle();
  }




  id: any = "mnuPerfil";
  showOption(ids: any) {
    this.id = ids;
    //console.log(this.id);
  }

}
