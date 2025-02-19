import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'http://localhost:3000/cities'; // URL base para las ciudades

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todas las ciudades */
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(() => console.log('Ciudades obtenidas')),
      catchError(error => {
        console.error('Error obteniendo ciudades:', error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener una ciudad por ID */
  getCityById(cityId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${cityId}`).pipe(
      tap(() => console.log(`Ciudad obtenida ID: ${cityId}`)),
      catchError(error => {
        console.error(`Error obteniendo ciudad ID: ${cityId}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Crear una nueva ciudad */
  createCity(cityData: any): Observable<any> {
    return this.http.post(this.apiUrl, cityData).pipe(
      tap(() => console.log('Ciudad creada con éxito')),
      catchError(error => {
        console.error('Error creando ciudad:', error);
        return of(null);
      })
    );
  }

  /** 🔹 Actualizar una ciudad existente */
  updateCity(id: number, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updateData).pipe(
      tap(() => console.log(`Ciudad actualizada ID: ${id}`)),
      catchError(error => {
        console.error(`Error actualizando ciudad ID: ${id}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Eliminar una ciudad */
  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Ciudad eliminada ID: ${id}`)),
      catchError(error => {
        console.error(`Error eliminando ciudad ID: ${id}`, error);
        return of();
      })
    );
  }
}
