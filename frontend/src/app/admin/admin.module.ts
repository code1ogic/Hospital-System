import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './component/auth/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDoctorDialogComponent } from './component/admin-dashboard/dialog/add-doctor-dialog/add-doctor-dialog.component';
import { AddStaffDialogComponent } from './component/admin-dashboard/dialog/add-staff-dialog/add-staff-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewAllDoctorsComponent } from './component/admin-dashboard/view-all-doctors/view-all-doctors.component';
import { ViewAllPatientsComponent } from './component/admin-dashboard/view-all-patients/view-all-patients.component';
import { ViewAllStaffComponent } from './component/admin-dashboard/view-all-staff/view-all-staff.component';



@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminComponent,
    AddDoctorDialogComponent,
    AddStaffDialogComponent,
    ViewAllDoctorsComponent,
    ViewAllPatientsComponent,
    ViewAllStaffComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
