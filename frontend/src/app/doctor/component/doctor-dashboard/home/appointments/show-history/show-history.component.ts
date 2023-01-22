import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorDataService } from 'src/app/doctor/service/doctor-data.service';

@Component({
  selector: 'app-show-history',
  templateUrl: './show-history.component.html',
  styleUrls: ['./show-history.component.css']
})
export class ShowHistoryComponent implements OnInit {
  panelOpenState = false;
  patientObj : any;
  appointments : any[] = [];
  constructor(private doctorDataService : DoctorDataService,
    @Inject(MAT_DIALOG_DATA) public data: {pId: string}) { }

  ngOnInit(): void {
    this.getPatientHistory();
  }

  getPatientHistory() {
    this.doctorDataService.getPatientHistory(this.data.pId).subscribe(res => {
      console.log(res);
      this.patientObj = res;
    }, err => {
      console.log(err);
    })
  }

}
