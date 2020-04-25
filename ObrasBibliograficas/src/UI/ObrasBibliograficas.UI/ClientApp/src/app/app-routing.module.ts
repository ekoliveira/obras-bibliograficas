import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AutoresComponent } from './pages/autores/autores.component';

const routes: Routes = [
  { path: 'autores', component: AutoresComponent },
  { path: '', component: AutoresComponent, pathMatch: 'full' },
  { path: '**', component: AutoresComponent},

];

export const routing : ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
