import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'authToken';
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token); 
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey); 
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token; // Returns true if token exists, false otherwise
  } 

  getUserName(): string | null {
    if(localStorage) {
      const token = localStorage.getItem(this.tokenKey);
      if (!token) {
        return null; // No token found
      }
      else {
        const decodeToken: any = jwtDecode(token);
        return decodeToken.userName || null;
      }
    }
    else
      return null; // LocalStorage is not available
  }

  constructor() {
  }

}
