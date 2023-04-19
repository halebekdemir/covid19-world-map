import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryRatesResolver } from 'src/shared/resolver/contry-rates/country-rates.resolver';
import { ROUTING } from 'src/shared/routing';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTING.WORLDMAP,
    pathMatch: "full"
  },
  {
    path: ROUTING.WORLDMAP,
    loadChildren: () => import('./world-map/world-map.module').then(m => m.WorldMapModule),
    resolve: {
      data: CountryRatesResolver
    }
  },
  {
    path: ROUTING.COUNTRY_DETAIL,
    loadChildren: () => import('./country-detail/country-detail.module').then(m => m.CountryDetailModule)
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
