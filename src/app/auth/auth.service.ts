import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../shared/models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Dynamically picks the right URL
  constructor(private http: HttpClient) { }

  register(user: User): Observable<string> {
    return this.http.post(`${this.apiUrl}auth/register`, {
      userName: user.userName,
      password: user.password,
      role: user.role
    }, 
    {
      responseType: 'text' 
    }).pipe(
      map((response: string) => {
        return response;
      }),
      catchError((error: any) => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }
}
