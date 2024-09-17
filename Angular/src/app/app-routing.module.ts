import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournoiComponent } from './pages/tournoi/tournoi.component';
import { TournoiCreateComponent } from './pages/tournoi-create/tournoi-create.component';
import { JoueurCreateComponent } from './pages/joueur-create/joueur-create.component';
import { LoginComponent } from './pages/login/login.component';
import { IsNotLoggedGuard } from './guards/is-not-logged.guard';
import { IsAdminGuard } from './guards/is-admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tournoi', pathMatch: 'full' },
  { path: 'tournoi', component: TournoiComponent },
  { path: 'tournoi-create', component: TournoiCreateComponent, canActivate: [ IsAdminGuard ] },
  { path: 'joueur-create', component: JoueurCreateComponent, canActivate:[IsNotLoggedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [IsNotLoggedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
