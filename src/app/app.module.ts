import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import {HttpClientModule} from '@angular/common/http';
import { CardListComponent } from './card-list/card-list.component';
import { CardDetailsComponent } from './card-list/card-details/card-details.component'
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FourofourComponent } from './fourofour/fourofour.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { AdvancedDetailsComponent } from './advanced/advanced-details/advanced-details.component';
import { AdvancedFilterComponent } from './advanced/advanced-filter/advanced-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardListComponent,
    CardDetailsComponent,
    FourofourComponent,
    SearchFilterComponent,
    AdvancedComponent,
    AdvancedDetailsComponent,
    AdvancedFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
