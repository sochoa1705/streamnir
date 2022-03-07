import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import { FileService } from 'src/app/Services/file.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() menu: any[];
  @ViewChild('drawer') sidenav: MatSidenav;

  isLogged = false;
  userStorage: UserStorage;

  img:string;

  constructor(
    public route: Router,
    public accountService: AccountsService,
    private fileService:FileService
  ) { }

  ngOnInit() {
    this.accountService.isLogged().subscribe(logged => {
      this.isLogged = logged;
      if (this.isLogged) {
        this.userStorage = this.accountService.getUserStorage();
       (!this.userStorage.image)?this.downloadImage(this.userStorage):null;

        this.userStorage = this.accountService.getUserStorage();
      }
    })
  }

  downloadImage(user:UserStorage){
    this.fileService.getImage(user.id).subscribe(img=>{
      this.userStorage.image = img;
      this.accountService.guardarImage(img);
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
  close(){
    this.sidenav.close()
    console.log('cerro');
    
  }

}
