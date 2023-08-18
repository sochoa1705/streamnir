import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { TokenService } from 'src/app/api/api-nmviajes/services/token.service';
import { GlobalComponent } from 'src/app/shared/global';
import { getParams } from 'src/app/shared/utils/getParams';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-results-search-page',
	templateUrl: './results-search-page.component.html',
	styleUrls: ['./results-search-page.component.scss']
})
export class ResultsSearchPageComponent implements OnInit {
	constructor(
		private _searchService: SearchService,
		private _tokenService: TokenService,
		private route: ActivatedRoute,
	) {}

	allDataGroups: Group[] = [];
	dataGroupsPaginate: Group[] = [];
	indexPaginate = 16;
	indexTabSelect = 0;

	ngOnInit() {
		this.getToken();
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
                this.getObjectParams();
			}
		});
	}

	getObjectParams() {
		this.route.queryParamMap.subscribe((params) => {
			const objParams = getParams(params);
			if(environment.urlApiMotorVuelos.includes('qa')) 
			this.getAllDataSearch(objParams);
			else this.getAllDataAnterior(objParams)
		});
	}


	getAllDataSearch(objSearch:any){
		this._searchService.getAllDataSearch(objSearch).subscribe({
			next:(res)=>{
				//agregar contador referente a los GDS, si no hay nada cuando se llego a los GDS, LoaderService Contador
				if(res.groups){
					this.allDataGroups=this.allDataGroups.concat(res.groups);
					this.allDataGroups.sort( (a,b) => a.pricingInfo.totalFare - b.pricingInfo.totalFare );
					this.allDataGroups.forEach((item, index) => {
						item.sequenceNumber = index;
					})
					this.dataGroupsPaginate=this.allDataGroups.slice(0, 8);
				}
				if(!GlobalComponent.appExchangeRate) GlobalComponent.appExchangeRate=res.exchangeRate;
				GlobalComponent.appResponseGroups=this.allDataGroups;
			},
			error:(err)=>{
				console.log(err)
			}
		});
	}

	getAllDataAnterior(objSearch:any){
		this._searchService.getAllDataGroups(objSearch).subscribe({
            next:(res)=>{
                this.allDataGroups = res.groups.sort( (a,b) => a.sequenceNumber - b.sequenceNumber );
				this.dataGroupsPaginate =  this.allDataGroups.slice(0, 8);
            },
            error:(err)=>{
                console.log(err,'err')
            }
        })
	}
}
