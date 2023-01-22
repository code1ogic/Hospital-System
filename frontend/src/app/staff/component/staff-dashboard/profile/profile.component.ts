import { Component, OnInit } from '@angular/core';
import { StaffDataService } from 'src/app/staff/service/staff-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  staffId : any;
  profileData : any;
  constructor(private staffDataService : StaffDataService) { }

  ngOnInit(): void {
    this.staffId = localStorage.getItem("staff_id");
    this.getProfile();
  }

  getProfile() {
   this.staffDataService.getStaffProfile(this.staffId).subscribe(res => {
    console.log(res);
    this.profileData = res;
   }, err => {
    console.log(err);
   })
  }

}
