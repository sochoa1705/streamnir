import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrls: ['./seguros.component.scss']
})
export class SegurosComponent implements OnInit {

  constructor(
    public offersService: OffersService,
    public dataPagePresenterService: DataPagePresenterService,
  ) { }

  ngOnInit(): void {
    console.log(this.dataPagePresenterService.data.sections[0].id === 0);
    
  }

}
