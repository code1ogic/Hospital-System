import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenDialogComponent } from 'src/app/shared/component/open-dialog/open-dialog.component';
import { Doctor } from 'src/app/shared/model/doctor';
import { Patient } from 'src/app/shared/model/patient';
import { Staff } from 'src/app/shared/model/staff';
import { DataService } from '../../service/data.service';
import { AddDoctorDialogComponent } from './dialog/add-doctor-dialog/add-doctor-dialog.component';
import { AddStaffDialogComponent } from './dialog/add-staff-dialog/add-staff-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  allStaff : Staff[] = [];
  allDoctors : Doctor[] = []
  allPatients : Patient[] = []
  constructor(public dialog: MatDialog,
              private dataService : DataService,
              private _snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    this.getAllStaff();
    this.getAllDoctors();
    this.getAllPatients();
  }

  addDoctor() {
    const dialogRef = this.dialog.open(AddDoctorDialogComponent,{
      height: 'auto',
      width: '600px',
      autoFocus: false,
      backdropClass: "blur-background"
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataService.addDoctor(result).subscribe(res => {
          this._snackBar.open("Doctor Regitration is successful", "Ok",{
            duration: 3000
          });
          this.ngOnInit();
        }, err => {
          console.log(err);
          this.dialog.open(OpenDialogComponent,{
            height: 'auto',
            width: '400px',
            position: {top: '10px'},
            data: { message: err.error, title : 'Registration Failed'}})
        })
      }
    })
  }

  addStaff() {
    const dialogRef = this.dialog.open(AddStaffDialogComponent,{
      height: 'auto',
      width: '600px',
      autoFocus: false,
      backdropClass: "blur-background"
     })

     dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataService.addStaff(result).subscribe(res => {
          this._snackBar.open("Staff Regitration is successful", "Ok",{
            duration: 3000
          });
          this.ngOnInit();
        }, err => {
          console.log(err);
          this.dialog.open(OpenDialogComponent,{
            height: 'auto',
            width: '400px',
            position: {top: '10px'},
            data: { message: err.error, title : 'Registration Failed'}})
        })
      }
    })
  }

  getAllStaff() {
    this.dataService.getAllStaff().subscribe(res => {
      this.allStaff = res;
    })
  }

  getAllDoctors() {
    this.dataService.getAllDoctors().subscribe(res => {
      this.allDoctors = res;
    })
  }

  getAllPatients() {
    this.dataService.getAllPatients().subscribe(res => {
      this.allPatients = res;
    })
  }

}
