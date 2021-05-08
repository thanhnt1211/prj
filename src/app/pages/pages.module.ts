import { PagesErrorModule } from "./pages-error/pages-error.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
// import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    PagesErrorModule,
    
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
  ],
})
export class PagesModule {
}
