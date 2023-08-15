import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { TokenService } from 'src/app/api/api-nmviajes/services/token.service';
import { GlobalComponent } from 'src/app/shared/global';
import { getParams } from 'src/app/shared/utils/getParams';

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
	indexTabSelect = 1;
	

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
			const objParams = getParams(params)
            this.getAllDataGroups(objParams);
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
