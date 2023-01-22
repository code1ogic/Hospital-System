import { Component, OnInit } from '@angular/core';
import { DoctorDataService } from 'src/app/doctor/service/doctor-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  doctorId : any;
  profileData : any;
  constructor(private doctorDataService : DoctorDataService) { }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem("doctor_id");
    this.getProfile();
  }

  getProfile() {
   this.doctorDataService.getDoctorInfo(this.doctorId).subscribe(res => {
    console.log(res);
    this.profileData = res;
   }, err => {
    console.log(err);
   })
  }
}
