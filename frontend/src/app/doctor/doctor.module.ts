import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDashboardComponent } from './component/doctor-dashboard/doctor-dashboard.component';
import { DoctorLoginComponent } from './component/auth/doctor-login/doctor-login.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/doctor-dashboard/home/home.component';
import { ProfileComponent } from './component/doctor-dashboard/profile/profile.component';
import { AppointmentsComponent } from './component/doctor-dashboard/home/appointments/appointments.component';
import { ShowHistoryComponent } from './component/doctor-dashboard/home/appointments/show-history/show-history.component';
import { UpdateComponent } from './component/doctor-dashboard/home/appointments/update/update.component';


@NgModule({
  declarations: [
    DoctorDashboardComponent,
    DoctorLoginComponent,
    HomeComponent,
    ProfileComponent,
    AppointmentsComponent,
    ShowHistoryComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class DoctorModule { }
