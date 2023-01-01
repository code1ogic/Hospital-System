import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/component/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/component/auth/admin-login/admin-login.component';
import { StaffLoginComponent } from './staff/component/auth/staff-login/staff-login.component';
import { StaffDashboardComponent } from './staff/component/staff-dashboard/staff-dashboard.component';

const routes: Routes = [
  {
    path: 'admin', children: [
      { path: 'login', component: AdminLoginComponent },
      { path: 'dashboard', component: AdminDashboardComponent }
    ]
  },
  {
    path: 'staff', children: [
      { path: 'login', component: StaffLoginComponent },
      { path: 'dashboard', component: StaffDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
