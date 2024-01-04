import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DestinosService } from './Component/home-page/vuelos/commons/components/destinos/services/destinos.service';
import { PopupService } from './Services/pop-up/popup.service';
import { LoaderSubjectService } from './shared/components/loader/service/loader-subject.service';
import { MatTooltip } from '@angular/material/tooltip';

export class LoginPerson {
	constructor(
			public email = '',
			public password = ''
	) { }
}

export class LoginBusiness {
	constructor(
			public email = '',
			public password = ''
	) { }
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	title = 'NuevoMundoViajes';

	@ViewChild('closeModalSesion') closeModalSesion: ElementRef;
	@ViewChild('closeModalNewAccount') closeModalNewAccount: ElementRef;
	@ViewChild('tooltip') matTooltip: MatTooltip;

	message: string = '';

	constructor(
			private _popUpSubject: PopupService,
			public loaderSubjectService: LoaderSubjectService,
			private readonly router: Router,
			private destinosService: DestinosService
	) {
		this.cerrarBoxClicFuera();
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.matTooltip.show(1000);
		}, 5000);
	}

	cerrarBoxClicFuera() {
		combineLatest([ fromEvent(document, 'click'), this._popUpSubject.state() ]).pipe(
				filter(resp => resp[1].open)
		).subscribe(resp => {
			const htmlSelected = (resp[0].target as HTMLElement)
			const popUpElement = document.getElementById(resp[1].id);

			if (htmlSelected.contains(popUpElement)) {
				this._popUpSubject.closePopUp('')
			}
		})
	}
}
