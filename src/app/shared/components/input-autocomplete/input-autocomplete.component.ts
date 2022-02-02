import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { CardAutocompleteComponent } from '../card-autocomplete/card-autocomplete.component';
import { ICardAutocomplete } from '../card-autocomplete/card-autocomplete.interface';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAutocompleteComponent),
      multi: true,
    },
  ],
})
export class InputAutocompleteComponent implements AfterViewInit, OnDestroy {
  boxOrigen = false;
  boxOrigenTerm = false;

  private _items: ICardAutocomplete[];

  @ViewChild('cardAutocompleteComponent') cardAutocompleteComponent: ElementRef;
  @ViewChild('input') input: ElementRef;

  @Input() set items(value: ICardAutocomplete[] | null) {
    if (value) {
      this._items = value;
    }
  }

  get items() {
    return this._items;
  }

  @Input() placeholder: string;
  @Input() loading: boolean = false;

  @Input() typeahead: Subject<string>;
  @Input() minTermLength = 2;

  public typeToSearchText: string;

  fromEventSubscripcion: Subscription;

  value: ICardAutocomplete | null;
  isDisabled: boolean;
  onChange = (_: any) => {};
  onTouch = () => {};

  constructor() {
    this.typeToSearchText = `Por favor ingrese ${this.minTermLength} o más caracteres`;
  }

  ngAfterViewInit() {
    this.hideBoxLogic();
  }

  keyUp(target: any) {
    const value: string = target.value || '';
    if (value.length >= this.minTermLength) {
      this.showBoxOrigen();
      this.boxOrigenTerm = false;
      this.typeahead.next(value);
    }else{
      this.boxOrigenTerm = true;
    }
  }

  showAutocomplete(){
    if(this._items.length > 0){
      setTimeout(() => {
        this.showBoxOrigen();

      }, 600);
    }
  }

  selectItm(itm: ICardAutocomplete) {
    this.onTouch();
    this.value = itm;
    this.writeValue(itm)
    this.onChange(itm);
    this.hideBoxOrigen();
  }


  writeValue(value: ICardAutocomplete): void {
    if (value) {
      this.value = value;
    }else{
      this.value = null;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  showBoxOrigen() {
    this.boxOrigen = true;
  }

  hideBoxOrigen(){
    this.boxOrigen = false;
  }

  hideBoxLogic() {
    this.fromEventSubscripcion = fromEvent(document, 'click').subscribe((e) => {
      // cerrar al darle click fuera de la caja

      if (!this.cardAutocompleteComponent.nativeElement.contains(e.target)  && !((e.target as HTMLInputElement).tagName == 'INPUT')  ) {
       this.hideBoxOrigen();

       if(this.input.nativeElement.value.length > 0 && !this.value){
         this.clean();
       }

      }


    });
  }

  clean(){
    this.value = null;
    this.input.nativeElement.value = "";
    this._items = [];
  }

  ngOnDestroy() {
    this.fromEventSubscripcion.unsubscribe();
  }
}
