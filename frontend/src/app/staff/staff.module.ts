import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffLoginComponent } from './component/auth/staff-login/staff-login.component';
import { StaffDashboardComponent } from './component/staff-dashboard/staff-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPatientComponent } from './component/staff-dashboard/register-patient/register-patient.component';
import { HomeComponent } from './component/staff-dashboard/home/home.component';
import { BookAppointmentComponent } from './component/staff-dashboard/book-appointment/book-appointment.component';
import { ProfileComponent } from './component/staff-dashboard/profile/profile.component';
import { AllPatientsComponent } from './component/staff-dashboard/home/all-patients/all-patients.component';
import { AllDoctorsComponent } from './component/staff-dashboard/home/all-doctors/all-doctors.component';
import { DatePipe } from '@angular/common';
import { AllAppointmentsComponent } from './component/staff-dashboard/home/all-appointments/all-appointments.component';


@NgModule({
  declarations: [
    StaffLoginComponent,
    StaffDashboardComponent,
    RegisterPatientComponent,
    HomeComponent,
    BookAppointmentComponent,
    ProfileComponent,
    AllPatientsComponent,
    AllDoctorsComponent,
    AllAppointmentsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class StaffModule { }
