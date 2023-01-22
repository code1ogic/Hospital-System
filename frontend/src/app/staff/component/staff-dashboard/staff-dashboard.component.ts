import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem("staff_id");
    this.router.navigate(['staff/login'])
  }
}
