import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardExpirationDate]'
})
export class CardExpirationDateDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    const trimmed = input.value.replace(/\s+/g, '').slice(0, input.value.indexOf('/')==-1?4:5);
    if (trimmed.length > 3) {
      return (input.value = `${trimmed.slice(0, 2)}/${trimmed.slice(trimmed.indexOf('/')==-1?2:3)}`);
    }
    return;
  }

}
