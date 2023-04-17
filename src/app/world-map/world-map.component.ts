import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTING } from 'src/shared/ROUTING';
@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent {
  countryElements:any;
  countryName:string;
  popupTopPosition:any;
  popupLeftPosition:any;
  popupOpacity:any = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer:Renderer2,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.countryElements = this.elementRef.nativeElement.querySelectorAll('[country]');
    this.addEventsCountry();
  }

  addEventsCountry() {
    this.countryElements.forEach( (element:any) => {
      this.countryClick(element);
      this.countryMouseEnter(element);
      this.countryMouseLeave(element);
    });
  }

  countryClick(element:any) {
    this.renderer.listen(element, "click", event => {
      console.log("event",event)
        let country = element.getAttribute('country');
        this.navigateDetail(country);
    });
  }

  countryMouseEnter(element:any) {
    this.renderer.listen(element, "mouseenter", event => {
      let country = element.getAttribute('country');
      this.countryName = country;
      this.popupOpacity = 1;
      this.popupLeftPosition = event.clientX + 30 + 'px';
      this.popupTopPosition = event.clientY + 30 + 'px';
    });
  }

  countryMouseLeave(element:any) {
    this.renderer.listen(element, "mouseleave", event => {
      this.countryName = '';
      this.popupOpacity = 0;
      this.popupLeftPosition = 0 + 'px';
      this.popupTopPosition = 0 + 'px';
    });
  }

  navigateDetail(country:string) {
     this.router.navigate(
      [ROUTING.COUNTRY_DETAIL], {
        queryParams: {
          country: country,
        }
      }
    );
  }
}
