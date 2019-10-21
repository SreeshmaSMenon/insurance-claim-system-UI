import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { SecurityGuard } from './security.guard';
import { ClaimComponent } from './claim/claim.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClaimStatusComponent } from './claim-status/claim-status.component';

/**
 * Configuring routing for the library application
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user-home', component: ClaimComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [SecurityGuard] },
  { path: 'status', component: ClaimStatusComponent },
  // { path: 'home', component: HomeComponent, canActivate: [SecurityGuard] },
  { path: '**', redirectTo: 'user-home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
