import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { Observable } from 'rxjs';

import { FilterTypes } from 'src/app/shared/constant';
import { FilterBlock, FilterResult } from './models/filter-result.interfaces';
import { roundNumber } from '../../utils';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss'],
})
export class FilterResultComponent implements OnInit, OnChanges {
  @Input() filters: FilterResult;
  @Output() filterChangeEvent = new EventEmitter<any>();
  @Output() currencyChangeEvent = new EventEmitter<any>();

  filter: any = {};
  filterSelected: FilterBlock[] = [];
  filterAeroline: boolean = false;
  exchangeRate: number;
  selectedCurrency = 'dolares';

  minValuePriceFilter: number = 0;
  maxValuePriceFilter: number = 0;
  minValuePrice: number = 0;
  maxValuePrice: number = 0;
  optionsPrice: Options;

  minValueDurationExit: number = 0;
  maxValueDurationExit: number = 0;
  minValueDurationExitFilter: number = 0;
  maxValueDurationExitFilter: number = 0;
  optionsDurationExit: Options;

  minValueDurationExitScale: number = 0;
  maxValueDurationExitScale: number = 0;
  minValueDurationExitScaleFilter: number = 0;
  maxValueDurationExitScaleFilter: number = 0;

  optionsDurationExitScale: Options;

  minValueDurationBack: number = 5;
  maxValueDurationBack: number = 16;
  optionsDurationBack: Options = {
    floor: 5,
    ceil: 16,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        default:
          return value + 'h' + ' 30min';
      }
    },
  };

  minValueDurationBackScale: number = 1;
  maxValueDurationBackScale: number = 24;
  optionsDurationBackScale: Options = {
    floor: 1,
    ceil: 24,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        default:
          return value + 'h';
      }
    },
  };
  constructor() {}

  ngOnInit(): void {
    this.selectedItems = new Array<string>();

    this.filter.airline = [];
    this.filter.equipaje = {
      bodega: false,
      mano: false,
    };
    this.filter.escala = {
      directo: false,
      uno: false,
      mas: false,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('entra a cambio');
    console.log(changes);

    const fil = changes.filters.currentValue;

    this.minValuePriceFilter = fil.price.min;
    this.maxValuePriceFilter = fil.price.max;

    console.log(this.minValuePriceFilter);
    console.log(this.maxValuePriceFilter);

    this.minValuePrice = Math.floor(this.minValuePriceFilter);
    this.maxValuePrice = Math.ceil(this.maxValuePriceFilter);
    this.exchangeRate = fil.exchangeRate;

    this.filter.price = {
      min: this.minValuePriceFilter,
      max: this.maxValuePriceFilter,
    };

    this.optionsPrice = {
      floor: this.minValuePrice,
      ceil: this.maxValuePrice,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '$' + value;
          case LabelType.High:
            return '$' + value;
          default:
            return '$' + value;
        }
      },
    };

    this.minValueDurationExitFilter = fil.flightDurationExit.min;
    this.maxValueDurationExitFilter = fil.flightDurationExit.max;

    this.minValueDurationExit = Math.floor(this.minValueDurationExitFilter);
    this.maxValueDurationExit = Math.ceil(this.maxValueDurationExitFilter);

    this.filter.durationExit = {
      min: this.minValueDurationExitFilter,
      max: this.maxValueDurationExitFilter,
    };

    this.optionsDurationExit = {
      floor: this.minValueDurationExit,
      ceil: this.maxValueDurationExit,
      //step: 0.25,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          default:
            return value + 'h';
        }
      },
    };

    this.minValueDurationExitScaleFilter = fil.flightElapsedExit.min;
    this.maxValueDurationExitScaleFilter = fil.flightElapsedExit.max;

    this.minValueDurationExitScale = Math.floor(
      this.minValueDurationExitScaleFilter
    );
    this.maxValueDurationExitScale = Math.ceil(
      this.maxValueDurationExitScaleFilter
    );

    this.filter.elapsedExit = {
      min: this.minValueDurationExitScale,
      max: this.maxValueDurationExitScale,
    };

    this.optionsDurationExitScale = {
      floor: this.minValueDurationExitScale,
      ceil: this.maxValueDurationExitScale,

      translate: (value: number, label: LabelType): string => {
        switch (label) {
          default:
            return value + 'h';
        }
      },
    };
  }

  toCheck(e: any) {
    if (
      this.filters.airlines != undefined &&
      this.filters.airlines.length > 0
    ) {
      if (e === true) {
        this.filters.airlines.forEach((x) => (x.checked = true));
        this.addFilter(FilterTypes.aerolineas);
      } else {
        this.filters.airlines.forEach((x) => (x.checked = false));
        this.removeFilter(FilterTypes.aerolineas);
      }
      this.filterAeroline = e;
    }
    this.verifyFilter();
  }

  selectedItems!: string[];

  checkId(e: any, code: any) {
    console.log(code);

    this.filters.airlines.forEach((x) => {
      if (x.code === code) {
        x.checked = e.target.checked;
      }
    });
    if (e.target.checked) {
      this.addFilter(FilterTypes.aerolineas);
    } else {
      if (!(this.filters.airlines.filter((x) => x.checked).length > 0)) {
        this.removeFilter(FilterTypes.aerolineas);
      }
    }
    this.verifyFilter();
  }

  verifyFilter() {
    this.filter.airline = [];

    this.filter.airline = this.filters.airlines.map((x) => {
      if (x.checked) return x.code;
      return null;
    });

    this.filter.airline = this.filter.airline.filter((a: any) => a != null);
    this.filter.price.min = this.minValuePrice;
    this.filter.price.max = this.maxValuePrice;

    this.filter.durationExit.min = this.minValueDurationExit;
    this.filter.durationExit.max = this.maxValueDurationExit;

    this.filter.elapsedExit.min = this.minValueDurationExitScale;
    this.filter.elapsedExit.max = this.maxValueDurationExitScale;

    this.filterChange();
  }

  addFilter(type: number) {
    if (!this.filterSelected.find((x) => x.filterType == type)) {
      let name = '';

      switch (type) {
        case FilterTypes.aerolineas:
          name = 'Aerolineas';
          break;
        case FilterTypes.precio:
          name = 'Precio';
          break;
        case FilterTypes.equipajebodega:
          name = 'Equipaje bodega';
          break;
        case FilterTypes.equipajemano:
          name = 'Equipaje de mano';
          break;
        case FilterTypes.escalas:
          name = 'Escala';
          break;
        case FilterTypes.duracionSalida:
          name = 'Duracion Salida';
          break;
        case FilterTypes.duracionEscala:
          name = 'Escala Salida';
          break;
        default:
          break;
      }

      this.filterSelected.push({
        name: name,
        filterType: type,
      });
    }
    console.log(this.filterSelected);
  }

  removeFilter(type: number) {
    if (this.filterSelected.find((x) => x.filterType == type)) {
      this.filterSelected = this.filterSelected.filter(
        (x) => x.filterType != type
      );
    }
  }

  durationExitChange(value: number) {
    this.filter.durationExit.min = value;
    // this.filterChange();
    //console.log(value);
    //this.addFilter(FilterTypes.precio);
  }

  durationExitMaxChange(value: number) {
    this.filter.durationExit.max = value;
    // this.filterChange();
    //console.log(value);
    //this.addFilter(FilterTypes.precio);
  }

  elapsedExitChange(value: number) {
    this.filter.elapsedExit.min = value;
    // this.filterChange();
    //console.log(value);
    //this.addFilter(FilterTypes.precio);
  }

  elapsedExitMaxChange(value: number) {
    this.filter.elapsedExit.max = value;
    // this.filterChange();
    //console.log(value);
    //this.addFilter(FilterTypes.precio);
  }

  filterPrice() {
    this.addFilter(FilterTypes.precio);
    this.verifyFilter();
  }

  filterDurationExit() {
    this.addFilter(FilterTypes.duracionSalida);
    this.verifyFilter();
  }

  filterElpasedExit() {
    this.addFilter(FilterTypes.duracionEscala);
    this.verifyFilter();
  }

  filterChange() {
    console.log('mandando el filtro');
    console.log(this.filter);
    this.filter.price.currency = this.selectedCurrency;
    this.filterChangeEvent.emit(this.filter);
  }

  changePriceCurrency(e?: any) {
    if (e != undefined && e.target.checked)
      this.selectedCurrency = e.target.value;

    console.log(this.exchangeRate);

    console.log(this.selectedCurrency);
    if (this.selectedCurrency == 'soles') {
      this.minValuePrice = Math.floor(
        roundNumber(this.minValuePriceFilter * this.exchangeRate, 2)
      );
      this.maxValuePrice = Math.ceil(
        roundNumber(this.maxValuePriceFilter * this.exchangeRate, 2)
      );

      this.optionsPrice = {
        floor: this.minValuePrice,
        ceil: this.maxValuePrice,
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return 'S/.' + value;
            case LabelType.High:
              return 'S/.' + value;
            default:
              return 'S/.' + value;
          }
        },
      };
    } else {
      this.minValuePrice = Math.floor(this.minValuePriceFilter);
      this.maxValuePrice = Math.ceil(this.maxValuePriceFilter);
      this.optionsPrice = {
        floor: this.minValuePrice,
        ceil: this.maxValuePrice,
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return '$' + value;
            case LabelType.High:
              return '$' + value;
            default:
              return '$' + value;
          }
        },
      };
    }
  }

  removeFilterBlock(type: number) {
    switch (type) {
      case FilterTypes.aerolineas:
        this.filters.airlines.forEach((x) => (x.checked = false));
        this.removeFilter(FilterTypes.aerolineas);
        this.verifyFilter();
        break;
      case FilterTypes.precio:
        this.changePriceCurrency();

        this.removeFilter(FilterTypes.precio);
        this.verifyFilter();
        break;
      case FilterTypes.equipajemano:
        this.filter.equipaje.mano = false;
        this.removeFilter(FilterTypes.equipajemano);
        this.verifyFilter();
        break;
      case FilterTypes.equipajebodega:
        this.filter.equipaje.bodega = false;
        this.removeFilter(FilterTypes.equipajebodega);
        this.verifyFilter();
        break;
      case FilterTypes.escalas:
        this.filter.escala.directo = false;
        this.filter.escala.uno = false;
        this.filter.escala.mas = false;
        this.removeFilter(FilterTypes.escalas);
        this.verifyFilter();
        break;
      case FilterTypes.duracionSalida:
        this.minValueDurationExit = this.minValueDurationExitFilter;
        this.maxValueDurationExit = this.maxValueDurationExitFilter;

        this.removeFilter(FilterTypes.duracionSalida);
        this.verifyFilter();
        break;
      case FilterTypes.duracionEscala:
        this.minValueDurationExitScale = this.minValueDurationExitScaleFilter;
        this.maxValueDurationExitScale = this.maxValueDurationExitScaleFilter;

        this.removeFilter(FilterTypes.duracionEscala);
        this.verifyFilter();
        break;
      default:
        break;
    }
  }

  changeEquipaje(e: any) {
    console.log('entra change equipaje');
    switch (e.target.name) {
      case 'equipajeMano':
        if (e.target.checked) this.addFilter(FilterTypes.equipajemano);
        else this.removeFilter(FilterTypes.equipajemano);

        this.filter.equipaje.mano = e.target.checked;
        break;
      case 'equipajeBodega':
        if (e.target.checked) this.addFilter(FilterTypes.equipajebodega);
        else this.removeFilter(FilterTypes.equipajebodega);

        this.filter.equipaje.bodega = e.target.checked;
        break;
      default:
        break;
    }
    this.verifyFilter();
  }
  changeEscala(e: any) {
    console.log('entra change escala');
    switch (e.target.name) {
      case 'directo':
        if (e.target.checked) this.addFilter(FilterTypes.escalas);
        else this.removeFilter(FilterTypes.escalas);

        this.filter.escala.directo = e.target.checked;
        break;
      case 'uno':
        if (e.target.checked) this.addFilter(FilterTypes.escalas);
        else this.removeFilter(FilterTypes.escalas);

        this.filter.escala.uno = e.target.checked;
        break;
      case 'mas':
        if (e.target.checked) this.addFilter(FilterTypes.escalas);
        else this.removeFilter(FilterTypes.escalas);

        this.filter.escala.mas = e.target.checked;
        break;
      default:
        break;
    }
    this.verifyFilter();
  }

  selectorCurrencyChange(e: any) {
    this.currencyChangeEvent.emit(e.value);
  }
}
