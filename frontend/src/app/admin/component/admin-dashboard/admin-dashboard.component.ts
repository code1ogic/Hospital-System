import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
        // this.dataService.addDoctor(result).subscribe(res => {
        //   this._snackBar.open("Doctor Regitration complete", "Ok",{
        //     duration: 3000
        //   });
        // })
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
    })
  }

}
