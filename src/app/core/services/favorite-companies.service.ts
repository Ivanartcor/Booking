import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoriteCompaniesService {
  private apiUrl = 'http://localhost:3000/user-favorite-companies';

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todas las empresas favoritas */
  getAllFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(() => console.log('Empresas favoritas obtenidas')),
      catchError(error => {
        console.error('Error obteniendo empresas favoritas:', error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener una asociación específica de empresa favorita */
getFavoriteCompany(userId: number, companyId: number): Observable<any | null> {
  return this.http.get<any>(`${this.apiUrl}/${userId}/${companyId}`).pipe(
    tap(() => console.log(`Obteniendo favorito: usuario ${userId}, empresa ${companyId}`)),
    catchError(error => {
      if (error.status === 404) {
        console.warn(`La empresa ID ${companyId} no está en favoritos para usuario ID ${userId}`);
        return of(null); // Si no existe, devolvemos `null`
      }
      console.error(`Error obteniendo empresa favorita (ID ${companyId}):`, error);
      return of(null);
    })
  );
}


    /** 🔹 Obtener todas las empresas favoritas de un usuario */
    getUserFavoriteCompanies(userId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
        tap(() => console.log(`Empresas favoritas obtenidas para usuario ID: ${userId}`)),
        catchError(error => {
          console.error(`Error obteniendo empresas favoritas para usuario ID: ${userId}`, error);
          return of([]);
        })
      );
    }
  

  /** 🔹 Agregar una empresa a favoritos */
  addToFavorites(userId: number, companyId: number): Observable<any> {
    return this.http.post(this.apiUrl, { userId, companyId }).pipe(
      tap(() => console.log(`Empresa ID ${companyId} añadida a favoritos`)),
      catchError(error => {
        console.error(`Error añadiendo empresa ID ${companyId} a favoritos:`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Eliminar una empresa de favoritos */
  removeFromFavorites(userId: number, companyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/${companyId}`).pipe(
      tap(() => console.log(`Empresa ID ${companyId} eliminada de favoritos`)),
      catchError(error => {
        console.error(`Error eliminando empresa ID ${companyId} de favoritos:`, error);
        return of();
      })
    );
  }
}
