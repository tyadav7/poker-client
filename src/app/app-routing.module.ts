import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';

const ROUTES: Routes = [
  {path:'', component: ClientComponent},
  {path:'**', redirectTo: '', pathMatch:'full' }
] ;

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
