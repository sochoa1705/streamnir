import { Component, OnInit } from '@angular/core';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-my-profyle',
  templateUrl: './my-profyle.component.html',
  styleUrls: ['./my-profyle.component.scss']
})
export class MyProfyleComponent implements OnInit {

  userStorage: UserStorage;

  constructor(public accountService: AccountsService) { }

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
}
