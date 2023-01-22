import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorDataService } from 'src/app/doctor/service/doctor-data.service';
import { Appointment } from 'src/app/shared/model/appointment';
import { Doctor } from 'src/app/shared/model/doctor';
import { StaffDataService } from 'src/app/staff/service/staff-data.service';
import { ShowHistoryComponent } from './show-history/show-history.component';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointmentDisplayedColumns: string[] = ['patientName', 'patientContact', 'apptDate','action'];
  pendingAppointmentDataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) appointmentPaginator !: MatPaginator;

  todaysDate : any = '';
  doctorsList : Doctor[] = [];
  dId : any = '';
  date !: Date;
  pendingAppointments : Appointment[] = [];
  constructor(public datepipe: DatePipe,
              private doctorDataService : DoctorDataService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todaysDate = this.datepipe.transform((new Date), 'mm-dd-yyyy');
    this.dId = localStorage.getItem("doctor_id");
    console.log(this.todaysDate);
    this.getAppointments();
  }

  getAppointments() {
    this.doctorDataService.getAppointments(this.dId,this.todaysDate)
      .subscribe(res => {
        this.pendingAppointments = res.appointments.filter((s : any) => s.status === 0);
        this.pendingAppointmentDataSource = new MatTableDataSource(this.pendingAppointments);
        this.pendingAppointmentDataSource.paginator = this.appointmentPaginator;
        console.log(this.pendingAppointments);
    }, err => {
      console.log(err);
    })
  }

  applyAppointmentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pendingAppointmentDataSource.filter = filterValue.trim().toLowerCase();

    if (this.pendingAppointmentDataSource.paginator) {
      this.pendingAppointmentDataSource.paginator.firstPage();
    }
  }

  getPatientHistoryDialog(pId : string) {
    const dialogRef = this.dialog.open(ShowHistoryComponent, {
      data : {pId : pId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  updatePatientDialog(pId : string, aId : string) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data : {pId : pId, aId : aId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


}
