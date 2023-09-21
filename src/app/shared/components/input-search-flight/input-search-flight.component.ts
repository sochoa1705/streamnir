import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-search-flight',
  templateUrl: './input-search-flight.component.html',
  styleUrls: ['./input-search-flight.component.scss']
})
export class InputSearchFlightComponent implements OnInit {
  private destroyDep$ = new Subject<unknown>();
  private destroyArr$ = new Subject<unknown>();
  constructor() { }
  
  rotate = false;
  valueSearchDeparture = new FormControl('');
  valueSearchArrival = new FormControl('');
  
  listResult: any[] = [];
  listSuggestions = [];

  isClickSuggestionDep = false;
  isClickSuggestionArr = false;

  showResultDep = false;
  showResultArr = false;

  
  
  ngOnInit(): void {

  }

}
