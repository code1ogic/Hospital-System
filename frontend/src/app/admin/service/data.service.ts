import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from 'src/app/shared/model/doctor';
import { Observable } from 'rxjs';
import { Staff } from 'src/app/shared/model/staff';
import { Patient } from 'src/app/shared/model/patient';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  doctorURL : string = "http://localhost:5000/api/doctors"
  staffURL : string = "http://localhost:5000/api/staff"
  patientURL : string = "http://localhost:5000/api/patients";
  constructor(private http : HttpClient) { }

  addDoctor(doctor : Doctor) : Observable<Doctor>{
    return this.http.post<Doctor>(this.doctorURL,doctor);
  }

  addStaff(staff : Staff) : Observable<Staff> {
    return this.http.post<Staff>(this.staffURL,staff);
  }

  getAllDoctors() : Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.doctorURL);
  }

  getAllPatients() : Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientURL);
  }

  getAllStaff() : Observable<Staff[]> {
    return this.http.get<Staff[]>(this.staffURL);
  }
}
