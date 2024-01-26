import { Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PopupService } from './Services/pop-up/popup.service';
import { MatTooltip } from '@angular/material/tooltip';
import Hotjar from '@hotjar/browser';
import { environment } from '../environments/environment';

export class LoginPerson {
	constructor(
			public email = '',
			public password = ''
	) {
	}
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	@ViewChild('tooltip') matTooltip: MatTooltip;

	title = 'NMViajes';

	message: string = '';

	constructor(private _popUpSubject: PopupService) {
		this.cerrarBoxClicFuera();
	}

	ngOnInit(): void {
		this.loadHotjar();

		setTimeout(() => {
			this.matTooltip.show(1000);
		}, 5000);
	}

	private loadHotjar() {
		const siteId = 3837481;
		const hotjarVersion = 6;
		Hotjar.init(siteId, hotjarVersion, {
			debug: !environment.production
		});
	}

	cerrarBoxClicFuera() {
		combineLatest([ fromEvent(document, 'click'), this._popUpSubject.state() ]).pipe(
				filter(resp => resp[1].open)
		).subscribe(resp => {
			const htmlSelected = (resp[0].target as HTMLElement);
			const popUpElement = document.getElementById(resp[1].id);

			if (htmlSelected.contains(popUpElement)) {
				this._popUpSubject.closePopUp('');
			}
		});
	}
}
