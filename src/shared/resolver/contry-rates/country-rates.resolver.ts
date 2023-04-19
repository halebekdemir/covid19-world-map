import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CountyRatesService } from 'src/shared/services/contry-rates/county-rates.service';

@Injectable({
  providedIn: 'root'
})
export class CountryRatesResolver implements Resolve<boolean> {

  constructor(private countyRatesService: CountyRatesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    // this.countyRatesService.getCountryList().subscribe((data:any) => {
      // return data;
    // });
  }
}
