import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() menu: any[];

  isLogged = false;

  user: UserStorage;

  constructor(
    public route: Router,
    public accountService: AccountsService
  ) { }

  ngOnInit() {

    this.accountService.isLogged().subscribe(logged => {
      this.isLogged = logged;

      if (this.isLogged) {
        this.user = this.accountService.getUserStorage();
      }
    })


  }

  toHome() {
    this.route.navigateByUrl('/')
  }
  to(e: any) {
    window.location.href = e;
  }
}
