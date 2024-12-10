import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import users from 'src/assets/data/users.json'; // Importamos el JSON

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: any = null;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const user = users.find((u) => u.email === email);

    if (user) {
      this.loggedInUser = user;
      this.redirectByRole(user.role);
      return true;
    }
    return false;
  }

  logout() {
    this.loggedInUser = null;
    this.router.navigate(['/auth/login']);
  }

  getUser() {
    return this.loggedInUser;
  }

  private redirectByRole(role: string) {
    switch (role) {
      case 'client':
        this.router.navigate(['/client/dashboard']);
        break;
      case 'company':
        this.router.navigate(['/company/dashboard']);
        break;
      case 'employee':
        this.router.navigate(['/employee/dashboard']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }
}