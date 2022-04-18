import { Component } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { ISuggest } from '../tab-vuelos/tab-vuelos.interfaces';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ParamsHoteles, ParamsAutos, URLAutos } from '../../tabs/tabs.models';



@Component({
    selector: 'app-tab-autos',
    templateUrl: './tab-autos.component.html',
    styleUrls: ['./tab-autos.component.scss']
  })
  export class TabAutosComponent {

    form!: FormGroup;
    fromDate: NgbDate | null;
    toDate: NgbDate | null;
    countriesSearch: Array<ISuggest> = [];

    constructor(private destineService: DestinyService) {
      this.form = new FormGroup({
        destino: new FormControl(''),
        initHour: new FormControl(''),
        lastHour: new FormControl(''),
      });

    }

    autoComplete(e: any) {
        // let elemento = this.origen.nativeElement;
        let elemento = e.target;
    
        let value = elemento.value;
    
        if (value.length >= 3) {
          this.getListSuggestions(value);
          //this.getListCiudades(value, typeSearch);
        }
      }

      getListSuggestions(e: any) {
        this.destineService.getSuggest(e).subscribe(
          data => {
            this.countriesSearch = data;
          },
          err => console.log(err)
        )
      }

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

      changeDateFirst(value: ClassValueCalendar) {
        this.fromDate = value.fromDate;
      }

      changeDateLast(value: ClassValueCalendar) {
        this.toDate = value.fromDate;
      }

      getParamsAutos(){
        let params = new ParamsAutos(
          this.fromDate,
          this.toDate,
          this.form,
          this.countriesSearch,
        ).getParams();
        console.log('params ', params);
        return params;
      }

      searchAuto(): void {
        const url = this.getUrlAutos();
        this.navigateToResponseUrl(url);
      }

      navigateToResponseUrl(url: string): void {
        window.location.href = url;
     }

     public getUrlAutos(){
      let url = ''
      let params = this.getParamsAutos();
      url = new URLAutos(params).getUrl();
      return url;
  }

  }