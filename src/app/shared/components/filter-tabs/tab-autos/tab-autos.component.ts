import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { ISuggest } from '../tab-vuelos/tab-vuelos.interfaces';
import { ClassValueCalendar } from '../../calendar/calendar.models';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { ParamsAutos, URLAutos } from '../../tabs/tabs.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputValidationService } from 'src/app/Services/inputValidation.service';
import { SearchCarRent } from '../../../../Services/analytics/tagging.models';
import { TaggingService } from '../../../../Services/analytics/tagging.service';
import * as moment from 'moment';

@Component({
    selector: 'app-tab-autos',
    templateUrl: './tab-autos.component.html',
    styleUrls: ['../tab-paquetes/tab-paquetes.component.scss', './tab-autos.component.scss']
  })
  export class TabAutosComponent {

    form!: FormGroup;
    fromDate: NgbDate | null;
    toDate: NgbDate | null;
    countriesSearch: Array<ISuggest> = [];
    countriesSearchRecojo: Array<ISuggest> = [];
    viewInputRecojo = false;
    conductor: Array<any> = [{code: '21', name: '21'},{code: '22', name: '22'},{code: '23', name: '23'},{code: '24', name: '24'},{code: '25', name: '25+'}];
    dateLimit: NgbDate;
    isChecked=true;

    constructor(private destineService: DestinyService, private _snackBar: MatSnackBar, public inputValidator : InputValidationService, private calendar: NgbCalendar) {
      this.form = new FormGroup({
        destino: new FormControl(''),
        recojo: new FormControl(''),
        initHour: new FormControl(''),
        lastHour: new FormControl(''),
        conductor: new FormControl(''),
        checkDevolver: new FormControl(true),
      });
      this.form.controls['initHour'].patchValue('12:00');
      this.form.controls['lastHour'].patchValue('12:00');
    }

    autoComplete(e: any) {
        // let elemento = this.origen.nativeElement;
        let elemento = e.target;
    
        let value = elemento.value;
    
        if (value.length >= 3) {
          this.getListSuggestions(value,1);
          //this.getListCiudades(value, typeSearch);
        }
    }

    autocompleteRecojo(e: any){
      let elemento = e.target;
    
      let value = elemento.value;
  
      if (value.length >= 3) {
        this.getListSuggestions(value,2);
        //this.getListCiudades(value, typeSearch);
      }
    }

    getListSuggestions(e: any, type: number) {
      this.destineService.getSuggest(e).subscribe(
        data => {
          if(type === 1) {
            this.countriesSearch = data;
          } else {
            this.countriesSearchRecojo = data;
          }
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
        this.dateLimit = this.calendar.getNext(this.fromDate || this.calendar.getToday(), 'd', 1);
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
          this.countriesSearchRecojo
        ).getParams();
        console.log('params ', params);
        return params;
      }

  searchAuto(): void {
    const errors = this.validateTab();

    if (errors.length > 0) {
      this.openSnackBar(errors.join(' - '))
      return;
    }
    const url = this.getUrlAutos();
    this.navigateToResponseUrl(url);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: [ 'mat-toolbar', 'mat-warn' ]
    });
  }

  validateTab() {
    const errors = [];

    if (this.form.controls['destino'].value == '')
      errors.push('El destino es requerido');

    if (this.form.controls['initHour'].value == '')
      errors.push('La hora de inicio es requerida');

    if (this.form.controls['lastHour'].value == '')
      errors.push('La hora de fin es requerida');

    if (!this.toDate)
      errors.push('La fecha final es requerida');

    if (!this.fromDate)
      errors.push('La fecha de inicio es requerida');

    if (this.fromDate && this.toDate) {
      let startDateStr = `${(this.fromDate!.day).toString()}/${(this.fromDate!.month).toString()}/${(this.fromDate!.year).toString()}`;
      let endDateStr = `${(this.toDate!.day).toString()}/${(this.toDate!.month).toString()}/${(this.toDate!.year).toString()}`;
      let startDate = moment(startDateStr, 'D/M/YYYY').format('YYYY-MM-DD');
      let endDate = moment(endDateStr, 'D/M/YYYY').format('YYYY-MM-DD');
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);

      if (endDateTime < startDateTime)
        errors.push('La fecha final no puede ser menor a la fecha de inicio');
    }

    return errors;
  }

  navigateToResponseUrl(url: string): void {
    window.location.href = url;
  }

  public getUrlAutos() {
    let url: string;
    let params = this.getParamsAutos();
    url = new URLAutos(params).getUrl();
    this.insertTag(params);
    return url;
  }

  insertTag(params: any) {
    const daysFromNow = moment(params.startDate, "YYYY-MM-DD").diff(moment(), 'days');
    const duracionViaje = moment(params.endDate, "YYYY-MM-DD")
        .diff(moment(params.startDate, "YYYY-MM-DD"), 'days');

    const model: SearchCarRent = {
      event: 'nmv_autos_buscar',
      operacion: {
        dias_anticipacion: daysFromNow
      },
      destino: {
        nombre: params.destino,
        codigo: params.idDestino,
        pais: params.countryCode
      },
      autos: {
        edad_conductor: this.form.get('conductor')!.value,
        lugar_devolucion: this.form.get('recojo')!.value
      },
      fechas: {
        salida: moment(params.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        retorno: moment(params.endDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        estadia: duracionViaje
      }
    };

    TaggingService.tagSearchCarRent(model);
  }

  changeChecked(): void {
    this.isChecked=!this.isChecked;
    this.form.controls.checkDevolver.setValue(this.isChecked);
    this.viewInputRecojo = !this.form.controls['checkDevolver'].value;
  }

  setFocusTime(inputElement: any){
    inputElement.nativeElement.focus();
  }

  }