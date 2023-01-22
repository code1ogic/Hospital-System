import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorDataService } from 'src/app/doctor/service/doctor-data.service';
import { Patient } from 'src/app/shared/model/patient';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  appointmentObj : FormGroup;
  patientObj : any;
  constructor(private doctorDataService : DoctorDataService,
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {pId: string, aId : string}) {

      this.appointmentObj = fb.group({
        aId: [Validators.required],
        symptoms: [Validators.required],
        reports:  [Validators.required],
        prescription: [Validators.required],
        comments : [Validators.required],
        status : []
      });
  }

  ngOnInit(): void {
    this.appointmentObj = this.fb.group({
      aId: new FormControl(this.data.aId, [Validators.required]),
      symptoms: new FormControl('', [Validators.required]),
      reports: new FormControl('',  [Validators.required]),
      prescription: new FormControl('', [Validators.required]),
      comments : new FormControl('', [Validators.required]),
      status : new FormControl(''),
    });
    this.getPatientData();
  }

  getPatientData() {
    this.doctorDataService.getPatientInformation(this.data.pId).subscribe(res => {
      this.patientObj = res;
    })
  }

  updateAppointment() {
    this.appointmentObj.value['status']=1;
    this.doctorDataService.updatePatintAppointment(this.appointmentObj.value).subscribe(res => {
      console.log(res);
    })
  }

}
