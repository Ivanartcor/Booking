import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = 'assets/data/users.json'; // Ruta al JSON
  private currentUser: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  // Simula el login con un email
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          this.currentUser = user; // Almacena al usuario actual
          this.redirectBasedOnRole(user.role); // Redirige según el rol
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Error al cargar los usuarios:', error);
        return of(false); // Maneja errores retornando false
      })
    );
  }

  // Redirige al layout correspondiente según el rol del usuario
  private redirectBasedOnRole(role: string): void {
    const route = {
      client: '/client',
      company: '/company',
      employee: '/employee',
    }[role] || '/auth/login';

    this.router.navigate([route]);
  }

  // Devuelve al usuario autenticado
  getCurrentUser(): any {
    return this.currentUser;
  }

  // Cierra la sesión
  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/auth/login']);
  }
}
