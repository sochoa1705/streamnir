import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { URLHotel, ParamsHoteles } from '../../tabs/tabs.models';

@Component({
  selector: 'app-tab-hotel',
  templateUrl: './tab-hotel.component.html',
  styleUrls: ['./tab-hotel.component.scss']
})
export class TabHotelComponent {

  form!: FormGroup;
  fromDate: NgbDate | null
  citys: Array<any> = [];
  origen: any;
  destino: any;
  toDate: NgbDate | null;

  distribution = '';
  hoveredDate: NgbDate | null = null;
  

  constructor(private calendar: NgbCalendar,private destineService: DestinyService ,public formatter: NgbDateParserFormatter,
    private _snackBar: MatSnackBar) {
    this.form = new FormGroup({
      destino: new FormControl(''),
    });

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  
   }


  autoComplete(e: any, typeSearch = 'FLIGHT_HOTEL') {
    // let elemento = this.origen.nativeElement;
    let elemento = e.target;

    let value = elemento.value;

    if (value.length >= 3) {
      this.getListCiudades(value, typeSearch);
    }
  }


  
  getListCiudades(e: any, typeSearch = 'FLIGHT_HOTEL') {
    console.log(e,typeSearch);
    this.destineService.getDestinyPaqueteDinamico(e, typeSearch).subscribe(
      data => {
        this.citys = data;

      },
      err => console.log(err),
      () => console.log('Ciudades cargadas')
    )
  }


  navigateToResponseUrl(url: string): void {
    window.location.href = url;
 }

  public searchAlojamiento() {
    const url = this.getUrlAlojamiento();
    this.navigateToResponseUrl(url);
  }

  public getUrlAlojamiento(){
      let url = ''
      let params = this.getParamsAlojamiento();
      url = new URLHotel(params, this.distribution).getUrl();
      return url;
  }

  getParamsAlojamiento(){
    let params = new ParamsHoteles(
      this.fromDate,
      this.toDate,
      this.form,
      this.citys,
    ).getParams();
    return params;
  }


  //TODO CREAR COMPONENTE DE FECHA
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

}
