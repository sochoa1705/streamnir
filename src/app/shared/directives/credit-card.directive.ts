import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardNumberFormat]'
})
export class CardNumberFormatDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let trimmedValue = input.value.replace(/\s+/g, '');
    const sanitizedValue = trimmedValue.replace(/\D/g, '');
    const formattedValue = this.formatCreditCardNumber(sanitizedValue);
    input.value = formattedValue;
  }

  private formatCreditCardNumber(value: string): string {
    const chunkSize = 4;
    const regex = new RegExp(`.{1,${chunkSize}}`, 'g');
    return value.match(regex)?.join(' ') || '';
  }
}