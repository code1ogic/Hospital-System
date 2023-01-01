import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorModule } from './doctor/doctor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { OpenDialogComponent } from './shared/component/open-dialog/open-dialog.component';
import { StaffModule } from './staff/staff.module';

@NgModule({
  declarations: [
    AppComponent,
    OpenDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    DoctorModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    StaffModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
