import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/service/auth.service';
import { OpenDialogComponent } from 'src/app/shared/component/open-dialog/open-dialog.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  show_spinner : boolean = false;
  email: any;
  password1 : any;

  constructor(private authService : AuthService, public dialog: MatDialog, private router : Router) { }

  ngOnInit(): void {
  }

  adminLogin() {
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
    this.authService.adminLogin(this.email,this.password1).subscribe(res => {
      if(res == true) {
        this.router.navigate(['admin/dashboard'])
      } else {
        const dialogRef = this.dialog.open(OpenDialogComponent,{
          height: '170px',
          width: '400px',
          position: {top: '10px'},
          data: { message: 'Email or Password is incorrect.', title : 'Error while login'}})

        dialogRef.afterClosed().subscribe(result => {
          this.show_spinner = false;
        })
      }
    })

  }

}
