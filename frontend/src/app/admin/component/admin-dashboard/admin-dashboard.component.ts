import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenDialogComponent } from 'src/app/shared/component/open-dialog/open-dialog.component';
import { DataService } from '../../service/data.service';
import { AddDoctorDialogComponent } from './dialog/add-doctor-dialog/add-doctor-dialog.component';
import { AddStaffDialogComponent } from './dialog/add-staff-dialog/add-staff-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private dataService : DataService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
        }, err => {
          this.dialog.open(OpenDialogComponent,{
            height: 'auto',
            width: '400px',
            position: {top: '10px'},
            data: { message: err.message, title : 'Registration Failed'}})
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
        })
      }
    })
  }

}
