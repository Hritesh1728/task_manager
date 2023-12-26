import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  isMobile: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef,
    private breakpointObserver: BreakpointObserver) { }
    
  ngOnInit() {
    const trigger = this.el.nativeElement.querySelector('.hamburger');
    const overlay = this.el.nativeElement.querySelector('.overlay');
    const wrapper = this.el.nativeElement.querySelector('#wrapper');

    let isClosed = false;

    this.renderer.listen(trigger, 'click', () => {
      hamburgerCross();
    });

    this.renderer.listen(this.el.nativeElement.querySelector('[data-toggle="offcanvas"]'), 'click', () => {
      wrapper.classList.toggle('toggled');
    });

    function hamburgerCross() {
      if (isClosed) {
        overlay.style.display = 'none';
        trigger.classList.remove('is-open');
        trigger.classList.add('is-closed');
        isClosed = false;
      } else {
        overlay.style.display = 'block';
        trigger.classList.remove('is-closed');
        trigger.classList.add('is-open');
        isClosed = true;
      }
    }

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      // Update isMobile based on screen size
      this.isMobile = result.matches;
    });

  }
}
