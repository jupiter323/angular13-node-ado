import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItmeListComponent } from './components/itme-list/itme-list.component';
import { ItmeDetailComponent } from './components/itme-detail/itme-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'workitems', pathMatch: 'full' },
  { path: 'workitems', component: ItmeListComponent },
  { path: 'workitems/:id', component: ItmeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


