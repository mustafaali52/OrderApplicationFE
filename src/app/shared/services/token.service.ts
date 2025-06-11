import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'authToken';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.tokenKey) : null;
  }

  removeToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserName(): string | null {
    if (this.isBrowser) {
      const token = localStorage.getItem(this.tokenKey);
      if (!token) {
        return null; // No token found
      }
      
      try {
        const decodeToken: any = jwtDecode(token);
        return decodeToken.userName || null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    
    return null; // Not in browser environment
  }
 
  getUserRole(): string | null {
    if (this.isBrowser) {
       const token = this.getToken();
      if (!token) return '';
      console.log('here');
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      return decoded.role || '';
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  isVendor(): boolean {
    return this.getUserRole() === 'Vendor';
  }

  isCustomer(): boolean {
    return this.getUserRole() === 'Customer';
  }

  isVendorOrAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'Vendor' || role === 'Admin';
  }

}