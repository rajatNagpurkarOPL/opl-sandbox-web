import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {

  //private regex: RegExp = new RegExp('^[0-9]*$');
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);  //Decimal Number
  private specialKeys: Array<string> = ['Backspace', 'ArrowLeft', 'ArrowRight'];
  constructor(private elementRef: ElementRef) { }



  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const inputValue: string = this.elementRef.nativeElement.value.concat(event.key);
    if (inputValue && !String(inputValue).match(this.regex)) {
      event.preventDefault();
    }

    return;
  }

  @HostListener('paste', ['$event']) onPaste(event: any) {
    const clipboardData = (event.originalEvent || event).clipboardData.getData('text/plain');
    if (clipboardData) {
      const regEx = new RegExp('^[0-9]*$');
      if (!regEx.test(clipboardData)) {
        event.preventDefault();
      }
    }
    return;
  }

}
