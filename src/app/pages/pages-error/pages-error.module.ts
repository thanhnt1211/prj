import { NgModule } from '@angular/core';
import { PagesErrorComponent } from './pages-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesErrorRoutingModule } from './pages-error-routing.module';

@NgModule({
  imports: [
    PagesErrorRoutingModule,
  ],
  declarations: [
    PagesErrorComponent,
    NotFoundComponent,
  ],
})
export class PagesErrorModule { }
