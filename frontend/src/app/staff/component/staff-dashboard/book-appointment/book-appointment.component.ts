import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenDialogComponent } from 'src/app/shared/component/open-dialog/open-dialog.component';
import { Appointment } from 'src/app/shared/model/appointment';
import { Doctor } from 'src/app/shared/model/doctor';
import { Patient } from 'src/app/shared/model/patient';
import { StaffDataService } from 'src/app/staff/service/staff-data.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  contact = ''
  patient : Patient = {
    pId: '',
    name: '',
    contact: '',
    gender: '',
    address: '',
    dob: ''
  };
  appointmentObj : Appointment = {
    aId: '',
    pId: '',
    dId: '',
    date: ''
  };
  dId : any;
  date : any;
  allDoctors : Doctor[] = [];
  constructor(private staffDataService : StaffDataService,
              private dialog : MatDialog,
              private _snackbar : MatSnackBar,
              public datepipe: DatePipe,) { }

  ngOnInit(): void {
    this.getAllDoctors();
    this.contact = '';
    this.dId = '';
    this.date = '';
    this.patient = {
      pId: '',
      name: '',
      contact: '',
      gender: '',
      address: '',
      dob: ''
    };

  }

  getPatient() {
    if(!this.contact) {
      this.dialog.open(OpenDialogComponent,{
        height: 'auto',
        width: '400px',
        position: {top: '10px'},
        data: { message: "Please enter contact number of patient.", title : 'Patient Details'}})
    }

    this.staffDataService.getPatientByContactNo(this.contact).subscribe(res=> {
      this.patient = res;
    }, err => {
      console.log(err)
      this.dialog.open(OpenDialogComponent,{
        height: 'auto',
        width: '400px',
        position: {top: '10px'},
        data: { message: err.error, title : 'Patient Details'}})

    })
  }

  getAllDoctors() {
    this.staffDataService.getAllDoctors().subscribe(res => {
      this.allDoctors = res;
    })
  }

  bookAppointment() {
    this.appointmentObj.pId = this.patient.pId;
    this.appointmentObj.dId = this.dId;
    this.appointmentObj.date = this.datepipe.transform(this.date,'yyyy-MM-dd') + ' ' + this.datepipe.transform(new Date(), 'hh:mm:ss');

    console.log( this.appointmentObj.date);
    this.staffDataService.bookAppointment(this.appointmentObj).subscribe(res => {
      this._snackbar.open("Registration of patient is successful !", "OK", {
        duration : 3000
      });
      this.ngOnInit();
    }, err => {
      this.dialog.open(OpenDialogComponent,{
        height: 'auto',
        width: '400px',
        position: {top: '10px'},
        data: { message: err.message, title : 'Registration Failed'}})
    })

  }

}
