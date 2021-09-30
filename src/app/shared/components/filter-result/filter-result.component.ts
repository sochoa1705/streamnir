import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { Observable } from 'rxjs';
import { FilterService } from 'src/app/Services/presenter/filter/filter.service';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss']
})
export class FilterResultComponent implements OnInit {
  selected = 'soles';
  minValuePrice: number = 1001;
  maxValuePrice: number = 5694;
  optionsPrice: Options = {
    floor: 1000,
    ceil: 5694,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "S/." + value;
        case LabelType.High:
          return "S/." + value;
        default:
          return "S/." + value;
      }
    }
  };

  minValueDurationExit: number = 5;
  maxValueDurationExit: number = 16;
  optionsDurationExit: Options = {
    floor: 5,
    ceil: 16,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        default:
          return value + "h" + " 30min";
      }
    }
  };

  minValueDurationExitScale: number = 1;
  maxValueDurationExitScale: number = 24;
  optionsDurationExitScale: Options = {
    floor: 1,
    ceil: 24,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        default:
          return value + "h";
      }
    }
  };

  minValueDurationBack: number = 5;
  maxValueDurationBack: number = 16;
  optionsDurationBack: Options = {
    floor: 5,
    ceil: 16,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        default:
          return value + "h" + " 30min";
      }
    }
  };

  minValueDurationBackScale: number = 1;
  maxValueDurationBackScale: number = 24;
  optionsDurationBackScale: Options = {
    floor: 1,
    ceil: 24,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        default:
          return value + "h";
      }
    }
  };
  constructor(
    public filterService: FilterService,
  ) { }

  ngOnInit(): void {
    // console.log(this.filterService.aerolineas);
    this.selectedItems = new Array<string>();

  }

  toCheck(e: any) {
    if (e === true) {
      this.filterService.aerolineas.forEach(x => x.checked = true)
    } else {
      this.filterService.aerolineas.forEach(x => x.checked = false)
    }
  }
  selectedItems!:string[];

  checkId(e: any, id: string) {
    if (e.target.checked) {
      this.filterService.aerolineas.forEach(x => {
      if(x.id === id){
        x.checked = e.target.checked
      }})

      // console.log(id + 'cheched');
      // this.selectedItems.push(id);
    }
    // else {
    //   console.log(id + 'Uncheched');
    //   this.selectedItems = this.selectedItems.filter(m => m != id);
    // }

    // console.log(this.selectedItems);
  }
}
