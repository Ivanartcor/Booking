import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private addressesUrl = 'http://localhost:3000/addresses'; // URL base de direcciones

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todas las direcciones */
  getAllAddresses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.addressesUrl}`).pipe(
      tap(() => console.log('Direcciones obtenidas')),
      catchError(error => {
        console.error('Error obteniendo direcciones:', error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener una dirección por ID */
  getAddressById(id: number): Observable<any> {
    return this.http.get<any>(`${this.addressesUrl}/${id}`).pipe(
      tap(() => console.log(`Dirección obtenida ID: ${id}`)),
      catchError(error => {
        console.error(`Error obteniendo dirección ID: ${id}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Crear una nueva dirección */
  createAddress(addressData: any): Observable<any> {
    return this.http.post(`${this.addressesUrl}`, addressData).pipe(
      tap(() => console.log('Dirección creada con éxito')),
      catchError(error => {
        console.error('Error creando dirección:', error);
        return of(null);
      })
    );
  }

  /** 🔹 Actualizar una dirección existente */
  updateAddress(id: number, addressData: any): Observable<any> {
    return this.http.put(`${this.addressesUrl}/${id}`, addressData).pipe(
      tap(() => console.log(`Dirección actualizada ID: ${id}`)),
      catchError(error => {
        console.error(`Error actualizando dirección ID: ${id}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Eliminar una dirección */
  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.addressesUrl}/${id}`).pipe(
      tap(() => console.log(`Dirección eliminada ID: ${id}`)),
      catchError(error => {
        console.error(`Error eliminando dirección ID: ${id}`, error);
        return of();
      })
    );
  }
}
