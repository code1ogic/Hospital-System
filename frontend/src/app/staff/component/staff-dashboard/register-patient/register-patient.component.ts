import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenDialogComponent } from 'src/app/shared/component/open-dialog/open-dialog.component';
import { Patient } from 'src/app/shared/model/patient';
import { StaffDataService } from 'src/app/staff/service/staff-data.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  patientObj : Patient = {
    name : '',
    contact : ''
  };
  constructor(private staffDataService : StaffDataService, private _snackbar : MatSnackBar, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.patientObj  = {
      name : '',
      contact : ''
    };
  }

  registerPatient() {
    this.staffDataService.registerPatient(this.patientObj).subscribe(res => {
      this._snackbar.open("Registration of patient is successful !", "OK", {
        duration : 3000
      });
      this.ngOnInit();
    }, err => {
      console.log(err);
      this.dialog.open(OpenDialogComponent,{
        height: 'auto',
        width: '400px',
        position: {top: '10px'},
        data: { message: err.message, title : 'Registration Failed'}})
    })
  }
}
