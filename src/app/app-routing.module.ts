import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedComponent } from './advanced/advanced.component';
import { CardDetailsComponent } from './card-list/card-details/card-details.component';
import { CardListComponent } from './card-list/card-list.component';
import { FourofourComponent } from './fourofour/fourofour.component';

const routes: Routes = [
  {path: '', redirectTo: '/cardlist', pathMatch: 'full'},
  {path: 'cardlist', component: CardListComponent} ,
  {path: 'cardlist/:id', component: CardDetailsComponent},
  { path: 'advanced', component: AdvancedComponent },
  { path: '**', component: FourofourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
