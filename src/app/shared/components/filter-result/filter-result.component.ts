import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { Observable } from 'rxjs';
import { FilterService } from 'src/app/Services/presenter/filter/filter.service';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss'],
})
export class FilterResultComponent implements OnInit {
  @Output() filterChangeEvent = new EventEmitter<any>();

  filter: any = {};
  selected = 'soles';
  minValuePrice: number = 100;
  maxValuePrice: number = 1500;
  optionsPrice: Options = {
    floor: 100,
    ceil: 1500,
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
  constructor(public filterService: FilterService) {}

  ngOnInit(): void {
    // console.log(this.filterService.aerolineas);
    this.selectedItems = new Array<string>();
    this.filter.precio = {
      min: this.minValuePrice,
      max: this.maxValuePrice,
    };
  }

  toCheck(e: any) {
    if (e === true) {
      this.filterService.aerolineas.forEach((x) => (x.checked = true));
    } else {
      this.filterService.aerolineas.forEach((x) => (x.checked = false));
    }
  }
  selectedItems!: string[];

  checkId(e: any, id: string) {
    if (e.target.checked) {
      this.filterService.aerolineas.forEach((x) => {
        if (x.id === id) {
          x.checked = e.target.checked;
        }
      });

      // console.log(id + 'cheched');
      // this.selectedItems.push(id);
    }
    // else {
    //   console.log(id + 'Uncheched');
    //   this.selectedItems = this.selectedItems.filter(m => m != id);
    // }

    // console.log(this.selectedItems);
  }

  priceChange(value: number) {
    this.filter.precio.min = value;
    this.filterChange();
  }

  priceMaxChange(value: number) {
    this.filter.precio.max = value;
    this.filterChange();
  }

  filterChange() {
    this.filterChangeEvent.emit(this.filter);
  }
}
