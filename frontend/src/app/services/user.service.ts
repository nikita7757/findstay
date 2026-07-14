import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8091/users';

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