import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './pages-error/not-found/not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'pages-error',
      loadChildren: () => import('./pages-error/pages-error.module')
        .then(m => m.PagesErrorModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
