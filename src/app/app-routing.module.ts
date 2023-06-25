import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BoxDetailComponent } from './components/box-detail/box-detail-component';

const routes: Routes = [
  { path: '', component: LoginComponentComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: `box/details/:id`, component: BoxDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
