import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollTop]',
  standalone: true
})
export class ScrollTopDirective {

  constructor(private el: ElementRef, private renderer2: Renderer2) { }

  @HostListener('window:scroll', ['$event'])
  toggleVisibility(event: Event) {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition >= 800) {
      this.renderer2.removeClass(this.el.nativeElement, "hide");
    } else {

      this.renderer2.addClass(this.el.nativeElement, "hide")
    }
  }

  @HostListener('click')
  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
