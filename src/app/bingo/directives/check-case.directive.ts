import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCheckCase]',
  standalone: true
})
export class CheckCaseDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  isChecked: boolean = false;
  @HostListener('click', ['$event'])
  toggleCheckCase() {
    this.isChecked = !this.isChecked
    if (this.isChecked) {
      this.renderer.addClass(this.el.nativeElement, "bingoCaseChecked")
    } else {
      this.renderer.removeClass(this.el.nativeElement, "bingoCaseChecked")
    }
    console.log(this.el.nativeElement);
  }
}
