import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoriteServicesService {
  private apiUrl = 'http://localhost:3000/user-favorite-services';

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todos los servicios favoritos */
  getAllFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(() => console.log('Servicios favoritos obtenidos')),
      catchError(error => {
        console.error('Error obteniendo servicios favoritos:', error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener una asociación específica de servicio favorito */
getFavoriteService(userId: number, serviceId: number): Observable<any | null> {
  return this.http.get<any>(`${this.apiUrl}/${userId}/${serviceId}`).pipe(
    tap(() => console.log(`Obteniendo favorito: usuario ${userId}, servicio ${serviceId}`)),
    catchError(error => {
      if (error.status === 404) {
        console.warn(`El servicio ID ${serviceId} no está en favoritos para usuario ID ${userId}`);
        return of(null); // Si no existe, devolvemos `null`
      }
      console.error(`Error obteniendo servicio favorito (ID ${serviceId}):`, error);
      return of(null);
    })
  );
}


  /** 🔹 Obtener todos los servicios favoritos de un usuario */
  getUserFavoriteServices(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
      tap(() => console.log(`Servicios favoritos obtenidos para usuario ID: ${userId}`)),
      catchError(error => {
        console.error(`Error obteniendo servicios favoritos para usuario ID: ${userId}`, error);
        return of([]);
      })
    );
  }

  /** 🔹 Agregar un servicio a favoritos */
  addToFavorites(userId: number, serviceId: number): Observable<any> {
    return this.http.post(this.apiUrl, { userId, serviceId }).pipe(
      tap(() => console.log(`Servicio ID ${serviceId} añadido a favoritos`)),
      catchError(error => {
        console.error(`Error añadiendo servicio ID ${serviceId} a favoritos:`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Eliminar un servicio de favoritos */
  removeFromFavorites(userId: number, serviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/${serviceId}`).pipe(
      tap(() => console.log(`Servicio ID ${serviceId} eliminado de favoritos`)),
      catchError(error => {
        console.error(`Error eliminando servicio ID ${serviceId} de favoritos:`, error);
        return of();
      })
    );
  }
}
