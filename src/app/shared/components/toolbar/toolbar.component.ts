import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import { FileService } from 'src/app/Services/file.service';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../components/login/login.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
	@Input() menu: any[];
	@ViewChild('drawer') sidenav: MatSidenav;

	isLogged = false;
	userStorage: UserStorage;
	img: string;

	loginModalSubscription = new Subscription();

  constructor(private fileService: FileService,
              public route: Router,
              private modalService: NgbModal,
              public accountService: AccountsService) {
  }

	ngOnInit() {
		this.route.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd)
				if (event.url.includes('/home/'))
					event.url.replace('/home/', '');
		});

		this.accountService.isLogged().subscribe(logged => {
			this.isLogged = logged;
			if (this.isLogged) {
				this.userStorage = this.accountService.getUserStorage();
				(!this.userStorage.image) ? this.downloadImage(this.userStorage) : null;
				this.userStorage = this.accountService.getUserStorage();
			}
		});

		this.openLoginFromUrl();
	}

  downloadImage(user: UserStorage) {
    this.fileService.getImage(user.id).subscribe(img => {
      this.userStorage.image = img;
      this.accountService.guardarImage(img);
    })
  }

  toHome() {
    this.route.navigateByUrl('/');

    // Renombrando valores para SEO - Inicio
    document.getElementsByTagName("title")[0].innerHTML = environment.SEO.home.title;

    let description = document.getElementsByName('description')[0];
    description.setAttribute("content", environment.SEO.home.description);

    const canonical = document.querySelector("link[rel='canonical']")
    canonical?.setAttribute("href", environment.SEO.home.url);

    const alternate = document.querySelector("link[rel='alternate']")
    alternate?.setAttribute("href", environment.SEO.home.url);

    const og_title = document.querySelector("meta[property='og:title']")
    og_title?.setAttribute("content", environment.SEO.home.title);

    const og_description = document.querySelector("meta[property='og:description']")
    og_description?.setAttribute("content", environment.SEO.home.description);

    const og_image = document.querySelector("meta[property='og:image']")
    og_image?.setAttribute("content", environment.SEO.home.image);

    const og_image_height = document.querySelector("meta[property='og:image:height']")
    og_image_height?.setAttribute("content", environment.SEO.home.height);

    const og_image_width = document.querySelector("meta[property='og:image:width']")
    og_image_width?.setAttribute("content", environment.SEO.home.width);

    const og_url = document.querySelector("meta[property='og:url']")
    og_url?.setAttribute("content", environment.SEO.home.url);
    // Renombrando valores para SEO - Fin
  }

  redirect(e: any) {
    //window.location.href = e;
    window.open(e, '_blank');
  }

  showOptionUser: Boolean = false;
  showOption() {
    this.showOptionUser = !this.showOptionUser
  }

	openLoginFromUrl() {
		const hash = location.hash;
		if (hash && hash.trim() === '#login')
			setTimeout(() => this.openLoginModal(), 1000);
	}

	openLoginModal() {
		location.hash = 'login';
		const loginModalRef = this.modalService.open(LoginComponent, {
			backdrop: 'static'
		});
		this.loginModalSubscription = loginModalRef.closed.subscribe(() => {
			history.pushState('', document.title, window.location.pathname + location.search);
		});
	}

  logout() {
    this.accountService.signOut()
    this.route.navigateByUrl("/")
  }

  close() {
    this.sidenav.close()
  }

	ngOnDestroy() {
		this.loginModalSubscription.unsubscribe();
	}
}
