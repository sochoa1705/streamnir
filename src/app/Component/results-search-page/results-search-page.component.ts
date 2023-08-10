import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { TokenService } from 'src/app/api/api-nmviajes/services/token.service';
import { GlobalComponent } from 'src/app/shared/global';

@Component({
	selector: 'app-results-search-page',
	templateUrl: './results-search-page.component.html',
	styleUrls: ['./results-search-page.component.scss']
})
export class ResultsSearchPageComponent implements OnInit {
	constructor(
		private _searchService: SearchService,
		private _tokenService: TokenService,
		private route: ActivatedRoute
	) {}
	ngOnInit() {
		this.getToken();
	}

	allDataGroups: Group[] = [];
	dataGroupsPaginate: Group[] = [];
	indexPaginate = 8;

	objSearch = {
		flightType: 0,
		adults: 1,
		children: 0,
		infants: 0,
		flightClass: 0,
		email: ''
	};

	getDataGroups() {
		this._searchService.getDataGroups().subscribe({
			next: (res) => {
				this.allDataGroups = res.groups;
				this.dataGroupsPaginate = res.groups.slice(0, 8);
				this.indexPaginate = this.indexPaginate + 8;
			}
		});
	}

	showMoreResults() {
		this.dataGroupsPaginate = this.dataGroupsPaginate.concat(
			this.allDataGroups.slice(this.dataGroupsPaginate.length, this.indexPaginate)
		);
		this.indexPaginate = this.indexPaginate + 8;
	}

	getToken() {
		this._tokenService.getAndSaveToken('Chrome').subscribe({
			next: (response) => {
				GlobalComponent.tokenMotorVuelo = response.accessToken;
				GlobalComponent.appReglasVentaAnticipada = response.reglasVentaAnticipada;
				GlobalComponent.appConfigurations = response.configuraciones;
                this.getParams();
			}
		});
	}

	getParams() {
		this.route.queryParamMap.subscribe((params) => {
			const objSearch: any = {
				flightType: Number(params.get('flightType')),
				flightClass: Number(params.get('flightClass')),
				adults: Number(params.get('adults')),
				children: Number(params.get('children')),
				infants: Number(params.get('infants')),
				email: params.get('email')
			};
			if (objSearch.flightType == 2) {
				objSearch.multicity = JSON.parse(params.get('json')?.replace(/\\/g, '') || '').map((item: any) => {
					item.departureLocation = item.departureLocation.split(' ')[0];
					item.arrivalLocation = item.arrivalLocation.split(' ')[0];
					const date = item.departureDate.split('/');
					item.departureDate = date[2] + '-' + date[1] + '-' + date[0];
					return item;
				});
			} else {
				objSearch.departureLocation = params.get('departureLocation')?.split(' ')[0];
				objSearch.arrivalLocation = params.get('arrivalLocation')?.split(' ')[0];
				const date = params.get('departureDate')?.split('/');
				if (date) objSearch.departureDate = date[2] + '-' + date[1] + '-' + date[0];
				if (objSearch.flightType == 0) {
					const date2 = params.get('arrivalDate')?.split('/');
					if (date2) objSearch.arrivalDate = date2[2] + '-' + date2[1] + '-' + date2[0];
				}
			}
			console.log(objSearch, 'obj');
            this.getAllDataGroups(objSearch);
		});
	}

    getAllDataGroups(objSearch:any){
        this._searchService.getAllDataGroups(objSearch).subscribe({
            next:(res)=>{
                this.allDataGroups = res.groups;
				this.dataGroupsPaginate = res.groups.slice(0, 8);
				this.indexPaginate = this.indexPaginate + 8;
            },
            error:(err)=>{
                console.log(err,'err')
            }
        })
    }
}
