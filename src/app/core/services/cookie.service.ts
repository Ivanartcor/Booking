import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  acceptCookies(): void {
    localStorage.setItem('cookiesAccepted', 'true');
  }

  rejectCookies(): void {
    localStorage.setItem('cookiesAccepted', 'false');
    this.clearCookies(); // Borrar cookies si el usuario las rechaza
  }

  hasAcceptedCookies(): boolean {
    return localStorage.getItem('cookiesAccepted') === 'true';
  }

  hasRejectedCookies(): boolean {
    return localStorage.getItem('cookiesAccepted') === 'false';
  }

  clearCookies(): void {
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }
}
