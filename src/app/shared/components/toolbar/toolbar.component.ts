import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import { FileService } from 'src/app/Services/file.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() menu: any[];

  isLogged = false;
  user: UserStorage;

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
        this.user = this.accountService.getUserStorage();
       (!this.user.image)?this.downloadImage(this.user):null;

      }
    })
  }

  downloadImage(user:UserStorage){
    this.fileService.getImage(user.id).subscribe(img=>{
      this.user.image = img;
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
}
