import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const buttons = this.el.nativeElement.querySelectorAll('.accordion-button');

    buttons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', () => {
        setTimeout(() => {
          const expanded = button.getAttribute("aria-expanded") === "true";
          if (expanded) {
            button.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 300);
      });
    });
  }
}
