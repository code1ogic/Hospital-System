import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDashboardComponent } from './component/doctor-dashboard/doctor-dashboard.component';
import { DoctorLoginComponent } from './component/auth/doctor-login/doctor-login.component';


@NgModule({
  declarations: [
    DoctorDashboardComponent,
    DoctorLoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DoctorModule { }
