import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  adminLogin(email : string, password : string) : Observable<any> {
    if(email === environment.adminEmail && password == environment.adminPassword) {
      localStorage.setItem("adminLoggedIn", "true")
      return of(true);
    }
    return of(false);
  }

  isAdminLoggedIn() {
    return localStorage.getItem("adminLoggedIn")
  }
}
