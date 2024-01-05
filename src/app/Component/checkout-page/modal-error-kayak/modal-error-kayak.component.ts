import { Component, Input, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from 'src/app/Services/accounts.service';

@Component({
  selector: 'app-modal-error-kayak',
  templateUrl: './modal-error-kayak.component.html',
  styleUrls: ['../../../shared/components/modal-error/modal-error.component.scss']
})
export class ModalErrorKayakComponent implements OnInit {
  @Input() params:ParamMap;

  constructor(private activeModal: NgbActiveModal,private _accountService: AccountsService,private router: Router) { }
  
  ngOnInit(): void {
    
  }

  redirectSearch(){
    if(this.params){
      const random = '?rand=' + Math.round(Math.random() * 10000000000);
      const userStorage = this._accountService.getUserStorage();
      const email = userStorage.email || '';
      const flightType = this.params.get('flightType');
      const departureLocation = this.params.get('departureLocation');
      const arrivalLocation = this.params.get('arrivalLocation');
      const departureDate = this.convertToDDMMYYYY(this.params.get('departureDate') || '');
      const arrivalDate =  this.convertToDDMMYYYY(this.params.get('arrivalDate') || '');
      const adults = this.params.get('adults');
      const children = this.params.get('children');
      const infants = this.params.get('infants');
      const flightClass = this.params.get('flightClass');

      const url=`/resultados${random}&departureLocation=${departureLocation}&arrivalLocation=${arrivalLocation}&departureDate=${departureDate}&arrivalDate=${arrivalDate}&adults=${adults}&children=${children}&infants=${infants}&flightType=${flightType}&flightClass=${flightClass}&lang=ES&email=${email}`;
      localStorage.setItem('searchParams', url);
      this.router.navigateByUrl(url);
    }
    this.activeModal.close();
    
  }

  convertToDDMMYYYY(date:string): any{
    if(date === undefined) return;
    let dates = date.split("-");
    return `${dates[2]}/${dates[1]}/${dates[0]}`;
  }

}
