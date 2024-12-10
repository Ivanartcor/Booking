import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import users from '../../assets/data/users.json'; // Importamos el JSON

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: any = null;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    // Simulamos la autenticación buscando al usuario en el JSON
    const user = users.find((u) => u.email === email);

    if (user) {
      this.loggedInUser = user; // Guardamos el usuario autenticado
      this.redirectByRole(user.role); // Redirigimos según el rol
      return true;
    }

    return false;
  }

  logout() {
    this.loggedInUser = null;
    this.router.navigate(['/auth/login']); // Redirigir al login
  }

  getUser() {
    return this.loggedInUser; // Retorna el usuario autenticado
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
