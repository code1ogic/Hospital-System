import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenDialogComponent } from 'src/app/shared/component/open-dialog/open-dialog.component';
import { AuthService } from 'src/app/staff/service/auth.service';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent implements OnInit {

  show_spinner : boolean = false;
  email: any;
  password1 : any;

  constructor(private authService : AuthService, public dialog: MatDialog, private router : Router) { }

  ngOnInit(): void {
  }

  staffLogin() {
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
    this.authService.staffLogin(data).subscribe(res => {
        this.router.navigate(['staff/dashboard'])
        localStorage.setItem("staff_token",res.token);
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
