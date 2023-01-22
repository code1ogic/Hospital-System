import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
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

  patientObj !: Patient ;
  personalDetailsFormGroup = this._formBuilder.group({
    name : ['', Validators.required],
    gender : ['', Validators.required],
    dob : ['', Validators.required],
  });
  contactDetailsFormGroup = this._formBuilder.group({
    contact: ['', Validators.required],
    address: ['', Validators.required]
  });
  gender : string[] = ['Male','Female', 'Other']

  constructor(private staffDataService : StaffDataService,
              private _snackbar : MatSnackBar,
              private dialog : MatDialog,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.patientObj  = {
      pId : '',
      name : '',
      contact : '',
      address : '',
      dob : '',
      gender : ''
    };
  }

  registerPatient() {
    this.patientObj.name = this.personalDetailsFormGroup.value.name !;
    this.patientObj.gender = this.personalDetailsFormGroup.value.gender !;
    this.patientObj.dob = this.personalDetailsFormGroup.value.dob !;
    this.patientObj.address = this.contactDetailsFormGroup.value.address !;
    this.patientObj.contact = this.contactDetailsFormGroup.value.contact !;

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
