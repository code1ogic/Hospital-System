import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DoctorDataService {
  doctorURL : string = "http://localhost:5000/api/doctors";
  appointmentURL : string = "http://localhost:5000/api/appointments";
  patientHistoryURL : string = "http://localhost:5000/api/patient-history";
  patientURL : string = "http://localhost:5000/api/patients";

  constructor(private http : HttpClient) { }

  updatePatintAppointment(appointmentObj : any) : Observable<any> {
    return this.http.put<any>(this.appointmentURL+'/'+appointmentObj.aId,appointmentObj);
  }

  getPatientHistory(patientId : string) : Observable<any>{
    return this.http.get<any>(this.patientHistoryURL+'/'+patientId);
  }

  getAppointments(dId : any, date : any) : Observable<any> {
    return this.http.get<any>(this.appointmentURL+'?dId='+dId+'&date='+date);
  }

  getPatientInformation(pId : string) : Observable<any> {
    return this.http.get<any>(this.patientURL+'/'+pId);
  }

  getDoctorInfo(dId : string) : Observable<any> {
    return this.http.get<any>(this.doctorURL+'/'+dId);
  }

}
