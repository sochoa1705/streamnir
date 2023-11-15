import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Package } from 'src/app/Models/packages/packages.interface';
import { PackageService } from 'src/app/Services/packages/packages.service';

@Component({
	selector: 'app-section-packages',
	templateUrl: './section-packages.component.html',
	styleUrls: ['./section-packages.component.scss']
})
export class SectionPackagesComponent implements OnInit {
	constructor(private _packageService: PackageService) {}
	dataPackages: Package[] = [];
	dataPackagesPag: Package[] = [];
	currentPag = 0;

	ngOnInit(): void {
		this.getPackages();
	}

	getPackages() {
		this._packageService.getPackagesHome().subscribe({
			next: (res) => {
				const response = res.Result.filter((item) => item.Active);
				response.sort((item) => item.Order);
				this.dataPackages = response;
				this.updateDisplayedData();
			}
		});
	}

	updateDisplayedData() {
		const number_responsive = window.innerWidth <= 1199 ? 1 : 0
		const currentPag = this.currentPag == 0 ? this.currentPag + (5 - number_responsive) : this.currentPag + (3 - number_responsive);
		if (currentPag > this.dataPackages.length) {
			this.dataPackagesPag = this.dataPackages.slice(0, (5 - number_responsive));
			this.currentPag = (5 - number_responsive);
			this.scrollReset();
		} else {
			this.dataPackagesPag = this.dataPackages.slice(0, currentPag);
			this.currentPag = currentPag;
		}
	}

	scrollReset() {
		document.querySelector('#sectionPackage')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		if (window.innerWidth < 1199) {
			if(this.dataPackages.length!==4){
				this.currentPag=0
				this.updateDisplayedData()
			}
		}else{
			if(this.dataPackages.length!==5){
				this.currentPag=0
				this.updateDisplayedData()
			}
		}
	}
}
