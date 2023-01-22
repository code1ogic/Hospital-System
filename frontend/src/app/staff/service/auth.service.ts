import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  staffURL : string = "http://localhost:5000/api/staff"

  constructor(private http : HttpClient) { }

  staffLogin(data : any) : Observable<any> {
    return this.http.post<any>(this.staffURL+'/login', data);
  }

  isStaffLoggedIn() {
    return localStorage.getItem("staff_id");
  }

}
