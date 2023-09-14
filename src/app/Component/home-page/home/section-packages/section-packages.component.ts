import { Component, OnInit } from '@angular/core';
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
		const currentPag = this.currentPag == 0 ? this.currentPag + 5 : this.currentPag + 3;
		if (currentPag > this.dataPackages.length) {
			this.dataPackagesPag = this.dataPackages.slice(0, 5);
			this.currentPag = 5;
			this.scrollReset();
		} else {
			this.dataPackagesPag = this.dataPackages.slice(0, currentPag);
			this.currentPag = currentPag;
		}
	}

	scrollReset() {
		const scrollPercentage = 38; // Porcentaje de desplazamiento
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTo = (documentHeight - windowHeight) * (scrollPercentage / 100);
		window.scroll({ top: scrollTo, behavior: 'smooth' });
	}
}
