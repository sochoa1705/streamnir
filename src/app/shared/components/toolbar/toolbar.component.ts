import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, UserStorage } from 'src/app/Services/account/account.service';

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
    public accountService: AccountService
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

  showOptionUser: Boolean = false;
  showOption() {
    this.showOptionUser = !this.showOptionUser
  }
  logout() {
    this.accountService.signOut()
    this.route.navigateByUrl("/")
  }
}
