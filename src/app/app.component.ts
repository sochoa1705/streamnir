import { Component } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { combineLatest, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PopupService } from './Services/pop-up/popup.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NuevoMundoViajes';
  pasajeros: any = [
    {
      adultos: 10,
      ninos: 1,
      infantes: 1
    }
  ]

  constructor(private popUpSubject: PopupService,private authService: SocialAuthService) {

    this.cerrarBoxClicFuera();


    this.authService.authState.subscribe((user) => {
      console.log(user);
    });

  }


  


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }


  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  
  socialMedia: Boolean = true;
  showSocialMedia($event: { index: string | number; }){
    this.socialMedia = $event.index == 0 ? true : false;
}

  cerrarBoxClicFuera() {
    combineLatest([fromEvent(document, 'click'), this.popUpSubject.state()]).pipe(
      filter(resp => resp[1].open == true)
    ).subscribe(resp => {
      const htmlSelected = (resp[0].target as HTMLElement)
      const popUpElement = document.getElementById(resp[1].id);

      if (htmlSelected.contains(popUpElement)) {
        this.popUpSubject.closePopUp('')
      }

    })

  }


}
