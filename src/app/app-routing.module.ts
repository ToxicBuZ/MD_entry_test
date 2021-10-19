import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForexApplicationComponent } from './forex/forex-application/forex-application.component';

const appRoutes: Routes = [
  {
    path: '', component: ForexApplicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
