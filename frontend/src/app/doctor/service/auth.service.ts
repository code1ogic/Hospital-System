import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  doctorURL : string = "http://localhost:5000/api/doctor"

  constructor(private http : HttpClient) { }

  doctorLogin(data : any) : Observable<any> {
    return this.http.post<any>(this.doctorURL+'/login', data);
  }

  isDoctorLoggedIn() {
    return localStorage.getItem("staff_id");
  }
}
