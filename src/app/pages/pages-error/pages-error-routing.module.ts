import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesErrorComponent } from './pages-error.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PagesErrorComponent,
    children: [
      {
        path: '404',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesErrorRoutingModule {
}
