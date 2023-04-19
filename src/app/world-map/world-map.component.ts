import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ROUTING } from 'src/shared/routing';
import { CountyRatesService } from 'src/shared/services/contry-rates/county-rates.service';
@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent {
  pageLoading:boolean = true;
  countryElements:any;
  countryName:string;
  popupTopPosition:any;
  popupLeftPosition:any;
  popupOpacity:any = 0;
  private unsubscribe = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private renderer:Renderer2,
    private router: Router,
    private countyRatesService: CountyRatesService
  ) {
    // this.route.data.subscribe((res:any) => {
    //   console.log("res",res);
    // });
    this.getCountryRatesData();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.countryElements = this.elementRef.nativeElement.querySelectorAll('[country]');
    this.addEventsCountry();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getCountryRatesData() {
    this.countyRatesService.getCountryList().pipe(takeUntil(this.unsubscribe)).subscribe((data:any) => {
      data.forEach((element:any) => {
        let rate = (element.data.deaths / element.data.confirmed)*100;
        let country = element.data.location;
        let colorClass;
        if (rate < 0.6) {
          colorClass = 'yellow';
        } else if(0.6 <= rate && rate <= 1.1){
          colorClass = 'orange';
        } else {
          colorClass = 'red';
        }
        this.elementRef.nativeElement.querySelector(`[country=${country}]`).classList.add(colorClass);
      });
      this.pageLoading = false;
    });
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
