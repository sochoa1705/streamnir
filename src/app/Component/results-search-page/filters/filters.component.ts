import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  formGroup: FormGroup;

  formObject = {
		currency: new FormControl(''),
	};
  constructor() { this.formGroup = new FormGroup(this.formObject);}


  ngOnInit(): void {
  }

}
