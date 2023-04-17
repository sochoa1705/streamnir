import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { InputValidationService } from 'src/app/Services/inputValidation.service';
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
    }
  ],
})
export class InputAutocompleteComponent implements AfterViewInit, OnDestroy {
  boxOrigen = false;
  boxOrigenTerm = false;
  inputTxt: string
  private _items: ICardAutocomplete[];

  @ViewChild('cardAutocompleteComponent') cardAutocompleteComponent: ElementRef;

  @Input() set items(value: ICardAutocomplete[] | null) {
    if (value) {
      this._items = value;
      this._items.forEach((item: ICardAutocomplete) => {
        if (item.isSelected) this.selectItm(item);
      });
    }
  }

  get items() {
    return this._items;
  }

  public typeToSearchText: string;

  @Input() valueInput: string = "";
  @Output() valueInputChange = new EventEmitter();

  @Input() placeholder: string;
  @Input() loading: boolean = false;
  @Input() validRequired: boolean = false;

  @Input() typeahead: Subject<string>;

  @ViewChild('inputSearch') inputSearch: ElementRef;

  _minTermLength: number;

  get minTermLength(): number {
    return this._minTermLength;
  }

  @Input() set minTermLength(value: number) {
    this._minTermLength = value;
    this.typeToSearchText = `Por favor ingrese ${this._minTermLength} o más caracteres`;
  };

  viewIcon: boolean

  fromEventSubscripcion: Subscription;

  value: ICardAutocomplete | null;
  isDisabled: boolean;
  onChange = (_: any) => { };
  onTouch = () => { };

  constructor(public inputValidator: InputValidationService) {
    this.viewIcon = false
  }

  ngAfterViewInit() {
    this.hideBoxLogic();
  }

  onkeypress(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();

      if (this.items?.length) {
        this.valueInput = this._items[0].title;
        this.valueInputChange.next(this.valueInput);

        this.selectItm(this._items[0]);
      }
    }
  }

  keyUp(event: any) {
    this.inputTxt = event.target.value

    const value: string = event.target.value || '';

    this.valueInputChange.next(value);

    if (value.length >= this.minTermLength) {
      this.showBoxOrigen(true)
      this.viewIcon = true
      this.boxOrigenTerm = false;
      this.typeahead.next(value);
    } else {
      this.viewIcon = false
      this.boxOrigenTerm = true
      this.showBoxOrigen(false)
    }
  }

  keyDown(event: any) {
    if (event.keyCode === 9) {
      if (this.items?.length) {
        this.valueInput = this._items[0].title;
        this.valueInputChange.next(this.valueInput);

        this.selectItm(this._items[0]);
      }
    }
  }

  /*onBlur() {
    if (this.items?.length) {
      this.valueInput = this._items[0].title;
      this.valueInputChange.next(this.valueInput);

      this.selectItm(this._items[0]);
    }
  }*/

  showAutocomplete() {
    if (this._items.length > 0)
      setTimeout(() => {
		  this.showBoxOrigen(false)
      }, 600);
  }

  selectItm(itm: ICardAutocomplete) {
    this.onTouch();
    this.valueInputChange.next(itm.title)
    this.value = itm;
    this.writeValue(itm)
    this.onChange(itm);
    this.hideBoxOrigen();
  }

  writeValue(value: ICardAutocomplete): void {
    if (value) {
      this.value = value;
      this.valueInput = value.title;
      this.viewIcon = true;
    } else {
      this.value = null;
      this.valueInput = ""
      this.viewIcon = false;
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

  showBoxOrigen(valid: boolean) {
    this.boxOrigen = valid
  }

  hideBoxOrigen() {
    this.boxOrigen = false;
  }

  hideBoxLogic() {
    this.fromEventSubscripcion = fromEvent(document, 'click').subscribe((e) => {
      // cerrar al darle clic fuera de la caja
      if (!this.cardAutocompleteComponent.nativeElement.contains(e.target) &&
          !((e.target as HTMLInputElement).tagName == 'INPUT')) {
        this.hideBoxOrigen();
        if (this.valueInput.length > 0 && !this.value) this.clean();
      }
    });
  }

  clean() {
    this.value = null;
    this.valueInput = "";
    this.viewIcon = false;

    this.inputSearch.nativeElement.focus();
  }

  ngOnDestroy() {
    this.fromEventSubscripcion.unsubscribe();
  }
}
