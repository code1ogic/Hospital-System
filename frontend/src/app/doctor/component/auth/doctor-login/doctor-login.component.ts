import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/doctor/service/auth.service';
import { OpenDialogComponent } from 'src/app/shared/component/open-dialog/open-dialog.component';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {
  show_spinner : boolean = false;
  email: any;
  password1 : any;

  constructor(private authService : AuthService, public dialog: MatDialog, private router : Router) { }

  ngOnInit(): void {
  }

  doctorLogin() {
    if(!this.email) {
      this.dialog.open(OpenDialogComponent,{
        height: '170px',
        width: '400px',
        position: {top: '10px'},
        data: { message: 'Email is empty.', title : 'Error while login' }})
      return;
    }

    if(!this.password1) {
      this.dialog.open(OpenDialogComponent,{
        height: '170px',
        width: '400px',
        position: {top: '10px'},
        data: { message: 'Password is empty.', title : 'Error while login'}})
      return;
    }

    this.show_spinner= true;
    const data = {
      "email" : this.email,
      "password" : this.password1
    }
    this.authService.doctorLogin(data).subscribe(res => {
        this.router.navigate(['doctor/dashboard'])
        localStorage.setItem("doctor_id",res.dId);
    }, err => {
      const dialogRef = this.dialog.open(OpenDialogComponent,{
        height: '170px',
        width: '400px',
        position: {top: '10px'},
        data: { message: 'Email or Password is incorrect.', title : 'Error while login'}})

      dialogRef.afterClosed().subscribe(result => {
        this.show_spinner = false;
      })
    })

  }

}
