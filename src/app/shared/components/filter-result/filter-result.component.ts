import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { Observable } from 'rxjs';

import { FilterTypes } from 'src/app/shared/constant';
import { FilterBlock, FilterResult } from './models/filter-result.interfaces';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss'],
})
export class FilterResultComponent implements OnInit {
  @Input() filters: FilterResult;
  @Output() filterChangeEvent = new EventEmitter<any>();

  filter: any = {};
  filterSelected: FilterBlock[] = [];
  filterAeroline: boolean = false;

  selectedCurrency = 'soles';
  minValuePrice: number = 100;
  maxValuePrice: number = 6000;
  optionsPrice: Options = {
    floor: 100,
    ceil: 6000,
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

  minValueDurationExit: number = 5;
  maxValueDurationExit: number = 16;
  optionsDurationExit: Options = {
    floor: 5,
    ceil: 16,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        default:
          return value + 'h' + ' 30min';
      }
    },
  };

  minValueDurationExitScale: number = 1;
  maxValueDurationExitScale: number = 24;
  optionsDurationExitScale: Options = {
    floor: 1,
    ceil: 24,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        default:
          return value + 'h';
      }
    },
  };

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
    this.filter.price = {
      min: this.minValuePrice,
      max: this.maxValuePrice,
    };
    this.filter.airline = [];
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

  priceChange(value: number) {
    this.filter.price.min = value;
    // this.filterChange();
    console.log(value);
    this.addFilter(FilterTypes.precio);
  }

  priceMaxChange(value: number) {
    this.filter.price.max = value;
    // this.filterChange();
    console.log(value);
    this.addFilter(FilterTypes.precio);
  }

  filterChange() {
    console.log('mandando el filtro');
    console.log(this.filter);
    this.filter.price.currency = this.selectedCurrency;
    this.filterChangeEvent.emit(this.filter);
  }

  changePriceCurrency(e: any) {
    if (e.target.checked) this.selectedCurrency = e.target.value;
    console.log(this.selectedCurrency);
    if (this.selectedCurrency == 'soles') {
      this.optionsPrice = {
        floor: 100,
        ceil: 6000,
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
      this.optionsPrice = {
        floor: 100,
        ceil: 6000,
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
        this.minValuePrice = 100;
        this.maxValuePrice = 6000;

        this.removeFilter(FilterTypes.precio);
        this.verifyFilter();
        break;
      default:
        break;
    }
  }
}
