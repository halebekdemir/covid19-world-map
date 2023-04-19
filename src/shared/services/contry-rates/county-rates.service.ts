import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatest, from } from 'rxjs';
import { APIINFO } from 'src/shared/api-info';
import { RequestMethod } from 'src/shared/enums/request-method';

@Injectable({
  providedIn: 'root'
})
export class CountyRatesService {
  mySubject: Subject<any> = new Subject();
  dataObservables: Observable<any>[] = [];

  constructor() { }

  getCountryList():Observable<any> {
    let countryList = Object.values(APIINFO.contries);

    countryList.forEach(el=> {
      let observable = this.getCovidData(el);
      this.dataObservables.push(observable);
    });

    combineLatest(this.dataObservables).subscribe(
      (results) => {
        this.mySubject.next(results)
      },
      (error) =>{ this.mySubject.next(error)},
      () => console.log('Completed')
    );
    return this.mySubject.asObservable();
  }

  getCovidData(country:string): Observable<any> {
    const options = {
      method: RequestMethod.GET,
      headers: APIINFO.rapidApiHeaders
    };
    return from(fetch(APIINFO.apiUrl + country, options)
      .then(response => response.json()));
  }
}
