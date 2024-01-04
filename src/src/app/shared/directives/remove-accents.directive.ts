import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRemoveAccents]',
})
export class RemoveAccentsDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput() {
    const inputValue = this.el.nativeElement.value;
    const cleanedValue = this.removeAccents(inputValue);
    this.el.nativeElement.value = cleanedValue;
  }

  private removeAccents(value: string): string {
    return value
      .replace(/[ÈÉËÊèéëê]/gi, 'e')
      .replace(/[ÌÍÏÎìíïî]/gi, 'i')
      .replace(/[ÒÓÖÔòóöô]/gi, 'o')
      .replace(/[ÙÚÜÛùúüû]/gi, 'u')
      .replace(/[ÀÁÄÂãàáäâ]/gi, 'a')
      .replace(/[Ññ]/g, 'n')
      .replace(/[Çç]/g, 'c');
  }
}