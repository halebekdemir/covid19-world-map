import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTING } from 'src/shared/ROUTING';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private router:Router) { }

  navigateHome() {
    this.router.navigate([ROUTING.WORLDMAP])
  }

}
