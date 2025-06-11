import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, tap } from 'rxjs';
import { User } from '../shared/models/user.model';
import { TokenService } from '../shared/services/token.service';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Adjust the URL as needed
  constructor(private http: HttpClient, private tokenService: TokenService) { 
  }
  registerUser(user: User): Observable<string> {
     return this.http.post(`${this.apiUrl}/auth/register`, {
          userName: user.UserName,
          password: user.PasswordHash,
          role: user.Role
      }, 
      {
        responseType: 'text'
      } 
    ).pipe(
      map((response: string) => {
        return response;
      }),
      catchError((error: any) => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Registration failed. Please try again later.'));
      }) 
    );
  }

  login (userName: string, password: string) : Observable<any> {
    return this.http.post<{token: string}>(`${this.apiUrl}/auth/login`, {userName, password})
    .pipe
      (
        tap((response) => {
          if (response && response.token) {
            this.tokenService.setToken(response.token);
            }   
          }
        ),
      )  
    {
    }
  }

  logout(): void {
    this.tokenService.removeToken();
  } 
}
