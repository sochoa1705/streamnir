import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-filtersafe',
  templateUrl: './filtersafe.component.html',
  styleUrls: ['./filtersafe.component.scss']
})
export class FiltersafeComponent implements OnInit {
  form!: FormGroup;
  selected = 'idavuelta';
  stateCtrl = new FormControl();
  stateCtrl2 = new FormControl();

  filteredStates: Observable<State[]>;
  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'origen.png'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'origen.png'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'origen.png'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'origen.png'
    },

  ];
  pasajeros: any = [
    {
      adultos: 6,
      ninos: 1,
      infantes: 1
    }
  ];
  constructor(
    public route: Router
  ) {
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );
  }

  ngOnInit(): void {
    this.createForm()

  }

  send() {
    console.log(this.form.value);
    this.route.navigateByUrl('/home/vuelos/resultados');
  }

  createForm() {
    this.form = new FormGroup({
      tipo: new FormControl('idavuelta'),
      catergory: new FormControl('economy'),
      // adultos: new FormControl(0),
      ninos: new FormControl(0),
      infantes: new FormControl(0),
      origen: new FormControl(''),
      destino: new FormControl(''),
      range: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      })
    })
  }

  customerClose(e: any) {
    let cdr: any = document.getElementById('cdr');
    cdr.style = `display:none`;
  }

  count(valor: number, e: any) {
    // (document.getElementById("num1") as HTMLInputElement).value
    let adultos: any = Number((document.getElementById('adultos') as HTMLInputElement).value);
    console.log(adultos);
    // console.log(adultos.value);
    // console.log(e);
    adultos = 10;
    let item = e.target.name;
    console.log(valor);

    // let pasajero = this.form.value.adultos;
    // if (pasajero >= 100 && valor >= 0) {
    //   return pasajero = 100
    // }
    // if (pasajero <= 0 && valor < 0) {
    //   return pasajero = 0  
    // }
    // console.log(pasajero);
    // console.log(pasajero + valor);
    //console.log(this.pasajeros[0]);

    adultos = adultos + valor
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }


}