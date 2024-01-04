import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardExpirationDate]'
})
export class CardExpirationDateDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const inputValue: string = event.target.value;

    // Remove any non-numeric characters
    const numericValue: string = inputValue.replace(/\D/g, '');

    // Add '/' after the first two digits
    if (numericValue.length > 2) {
      event.target.value = numericValue.slice(0, 2) + '/' + numericValue.slice(2);
    } else {
      event.target.value = numericValue;
    }
  }

}
