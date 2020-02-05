import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistryComponent } from './components/registry/registry.component';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogComponent } from './components/blog/blog.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro', component: RegistryComponent },
  { path: 'confirm', component: ConfirmedComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'blog', component: BlogComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
