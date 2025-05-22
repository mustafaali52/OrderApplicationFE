import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// import { TokenService } from '../shared/services/token.service';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/auth';

  constructor(private http: HttpClient
    //, private tokenService: TokenService
    ) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        //this.tokenService.setToken(response.token);
      })
    );
  }

  register(user: User, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { 
      username: user.username, 
      role: user.role, 
      password 
    });
  }

  logout(): void {
    //this.tokenService.clearToken();
  }
}