import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private apiUrl = "https://findstay-4353.onrender.com/users";

  constructor(private http: HttpClient) { }

  // Register
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login
loginUser(user: any): Observable<any> {

  return this.http.post<any>(
    `${this.apiUrl}/login`,
    user
  );

}

}
