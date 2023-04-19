import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIINFO } from 'src/shared/api-info';
import { RequestMethod } from 'src/shared/enums/request-method';
import { ROUTING } from 'src/shared/routing';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
  animations: [
    trigger('enterBox', [
      transition(':enter', [
        style({
            opacity: '0'
        }),
        animate('1000ms 0ms ease-in')
      ]),
  ]),
  ]
})
export class CountryDetailComponent {
  pageLoading:boolean = false;
  country:string;
  covidData:any;
  globalOption:string = 'Global';
  counryNotFound:boolean = false;
  counryNotFoundTxt:string = '';
  pageSuccess:boolean = true;
  errorMsg:string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) { }
  
  ngOnInit() {
    this.getCountryFromQuery();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event:any) {
    this.getCountryFromQuery();
  }

  getCountryFromQuery() {
    this.country = this.route.snapshot.queryParams['country'];
    this.getCovidData(this.country);
  }

  getCovidData(country:string) {
    this.pageLoading = true;
    const options = {
      method: RequestMethod.GET,
      headers: APIINFO.rapidApiHeaders
    };
    fetch(APIINFO.apiUrl + country, options)
      .then(response => response.json())
      .then(response => {
        this.errorMsg = '';
        this.pageLoading = false;
        this.pageSuccess = true;
        this.covidData = response.data;
      })
      .catch(err => {
        this.pageLoading = false;
        this.pageSuccess = false;
        this.errorMsg = err.message;
      });
  }

  getGlobalStatistics() {
    this.getCovidData(this.globalOption);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {country: this.globalOption},
      skipLocationChange: false
    });
  }

  navigateWorldMap() {
    this.router.navigate([ROUTING.WORLDMAP]);
  }
}
