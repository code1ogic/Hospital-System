import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/shared/model/appointment';
import { Doctor } from 'src/app/shared/model/doctor';
import { Patient } from 'src/app/shared/model/patient';

@Injectable({
  providedIn: 'root'
})
export class StaffDataService {
  staffURL : string = "http://localhost:5000/api/staff";
  doctorURL : string = "http://localhost:5000/api/doctors";
  patientURL : string = "http://localhost:5000/api/patients/";
  appointmentURL : string = "http://localhost:5000/api/appointments";
  constructor(private http : HttpClient) { }

  registerPatient(patient : Patient) : Observable<Patient> {
    return this.http.post<Patient>(this.patientURL, patient);
  }

  getStaffProfile(satffId : string) : Observable<Patient>{
    return this.http.get<Patient>(this.staffURL+'/'+satffId);
  }

  getAllDoctors() : Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.doctorURL);
  }

  getAllPatients() : Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientURL);
  }

  getPatientByContactNo(contact : any) : Observable<Patient> {
    return this.http.get<Patient>(this.patientURL+'find?contact='+contact);
  }

  bookAppointment(appointmentObj : Appointment) : Observable<Appointment> {
    return this.http.post<Appointment>(this.appointmentURL,appointmentObj);
  }

  getAppointments(dId : any, date : any) : Observable<any> {
    return this.http.get<any>(this.appointmentURL+'?dId='+dId+'&date='+date);
  }
}
