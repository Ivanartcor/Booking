

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // URL base de autenticación
  private usersUrl = 'http://localhost:3000/users'; // URL base de usuarios
  private uploadUrl = 'http://localhost:3000/upload'; // URL para subida de archivos
  private userSubject = new BehaviorSubject<any>(null); // Estado del usuario autenticado
  public user$ = this.userSubject.asObservable(); // Observable para escuchar cambios

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage(); // Cargar usuario al iniciar el servicio
  }

  // Autenticación con credenciales (Login)
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        console.error('Se ha logueado bien');
        this.fetchUserProfile(); // Obtener datos del usuario después del login
      }),
      map(() => true),
      catchError(error => {
        console.error('Error en login:', error);
        return of(false);
      })
    );
  }

  // Obtiene los datos del usuario autenticado
  fetchUserProfile(skipRedirect: boolean = false): void {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    this.http.get<any>(`${this.usersUrl}/me`, { headers }).pipe(
      tap(user => {
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user)); // Guardar usuario en LocalStorage
  
        if (!skipRedirect) { 
          this.redirectBasedOnRole(user.role); // Solo redirige si skipRedirect es falso
        }
      }),
      catchError(error => {
        console.error('Error obteniendo perfil:', error);
        this.logout(); // Si hay error, cerrar sesión
        return of(null);
      })
    ).subscribe();
  }
  


  /** Actualiza los datos del usuario actual */
  updateUser(updateData: Partial<any>): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) return of(null);
  
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    return this.http.put(`${this.usersUrl}/me`, updateData, { headers }).pipe(
      tap(() => {
        console.log('Perfil actualizado');
        this.fetchUserProfile(true); // Recargar datos sin redireccionar
      }),
      catchError(error => {
        console.error('Error actualizando usuario:', error);
        return of(null);
      })
    );
  }
  

  /**  Actualiza los datos de cualquier usuario */
  updateUserById(userId: number, updateData: Partial<any>): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) return of(null);

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(`${this.usersUrl}/${userId}`, updateData, { headers }).pipe(
      tap(() => {
        console.log(`Usuario con ID ${userId} actualizado`);
        if (userId === this.getCurrentUser().id) {
          this.refreshUserProfile(); // Si es el usuario actual, recargar perfil
        }
      }),
      catchError(error => {
        console.error(`Error actualizando usuario ${userId}:`, error);
        return of(null);
      })
    );
  }


   /** 🔹 Subir imagen de perfil */
   uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post<{ filePath: string }>(`${this.uploadUrl}`, formData).pipe(
      tap((res) => console.log('Imagen subida:', res)),
      map((res) => res.filePath), // Extrae la ruta del archivo
      switchMap((filePath) => this.updateProfilePicture(filePath)), // Espera a que se actualice en la API
      tap(() => this.fetchUserProfile(true)), // Recarga el perfil pero SIN redirigir
      catchError((error) => {
        console.error('Error subiendo imagen:', error);
        return of(null);
      })
    );
  }
  


   /** 🔹 Actualiza la URL de la imagen de perfil en el usuario */
   updateProfilePicture(imageUrl: string): Observable<any> {
    return this.updateUser({ profile_picture: imageUrl }).pipe(
      tap(() => console.log('Imagen de perfil actualizada')),
      catchError(error => {
        console.error('Error actualizando imagen de perfil:', error);
        return of(null);
      })
    );
  }


   /** 🔹 Recarga los datos del usuario después de cambios */
   private refreshUserProfile(): void {
    this.fetchUserProfile(true);
  }


  /** Redirige al layout correspondiente según el rol */
  private redirectBasedOnRole(role: string): void {
    const route = {
      client: '/client',
      company: '/company',
      employee: '/employee',
    }[role] || '/auth/login';

    this.router.navigate([route]);
  }


   /** Registro de usuario */
   register(userData: any): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap(() => console.log('Usuario registrado con éxito')),
      map(() => true),
      catchError(error => {
        console.error('Error en el registro:', error);
        return of(false);
      })
    );
  }

  
  // Devuelve el usuario actual almacenado en el servicio
  getCurrentUser(): any {
    return this.userSubject.value;
  }


    // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Cierra sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }



  // Método para actualizar la contraseña
  updatePassword(currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) return of(null);

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(`${this.apiUrl}/update-password`, { currentPassword, newPassword }, { headers }).pipe(
      tap(() => console.log('Contraseña actualizada exitosamente')),
      catchError(error => {
        console.error('Error al actualizar contraseña:', error);
        return of(null);
      })
    );
  }

  // Carga el usuario desde el LocalStorage al iniciar la aplicación
  private loadUserFromLocalStorage(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }
}


/*
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
    return this.currentUser
      ? { ...this.currentUser, profilePicture: this.currentUser.profilePicture || '/assets/images/foto-perfil.jpg' }
      : null;
  }
  

  updateCurrentUser(updatedUser: any): void {
    this.currentUser = updatedUser; // Actualiza el usuario actual en el servicio
  }

  updateProfilePicture(url: string): void {
    if (this.currentUser) {
      this.currentUser.profilePicture = url;
    }
  }
  
  // Cierra la sesión
  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/auth/login']);
  }
}

*/