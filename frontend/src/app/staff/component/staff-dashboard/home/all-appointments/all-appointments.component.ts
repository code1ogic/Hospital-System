import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from 'src/app/shared/model/appointment';
import { Doctor } from 'src/app/shared/model/doctor';
import { StaffDataService } from 'src/app/staff/service/staff-data.service';

@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.css']
})
export class AllAppointmentsComponent implements OnInit {
  appointmentDisplayedColumns: string[] = ['patientName', 'patientContact', 'apptDate'];
  appointmentDataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) appointmentPaginator !: MatPaginator;
  @ViewChild(MatSort) appointmentSort !: MatSort;

  todaysDate : any = '';
  doctorsList : Doctor[] = [];
  dId : any = '';
  date !: Date;
  allAppointments : Appointment[] = [];
  constructor(public datepipe: DatePipe,
              private staffDataService : StaffDataService) { }

  ngOnInit(): void {
    this.todaysDate = this.datepipe.transform((new Date), 'yyyy-mm-dd');
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.staffDataService.getAllDoctors().subscribe(res => {
      this.doctorsList = res;
    }, err => {
      console.log('')
    })
  }

  getAppointments() {
    this.staffDataService.getAppointments(this.dId,this.datepipe.transform(this.date, 'yyyy-MM-dd'))
      .subscribe(res => {
        this.allAppointments = res.appointments;
        this.appointmentDataSource = new MatTableDataSource(this.allAppointments);
        this.appointmentDataSource.paginator = this.appointmentPaginator;
        this.appointmentDataSource.sort = this.appointmentSort;
        console.log(this.appointmentDataSource);
    }, err => {
      console.log(err);
    })
  }

  applyAppointmentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.appointmentDataSource.filter = filterValue.trim().toLowerCase();

    if (this.appointmentDataSource.paginator) {
      this.appointmentDataSource.paginator.firstPage();
    }
  }

}
