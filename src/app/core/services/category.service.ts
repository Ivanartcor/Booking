import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories'; // URL base para categorías

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todas las categorías */
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(() => console.log('Categorías obtenidas')),
      catchError(error => {
        console.error('Error obteniendo categorías:', error);
        return of([]);
      })
    );
  }

  /** 🔹 Obtener una categoría por ID */
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${categoryId}`).pipe(
      tap(() => console.log(`Categoría obtenida ID: ${categoryId}`)),
      catchError(error => {
        console.error(`Error obteniendo categoría ID: ${categoryId}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Crear una nueva categoría */
  createCategory(categoryData: any): Observable<any> {
    return this.http.post(this.apiUrl, categoryData).pipe(
      tap(() => console.log('Categoría creada con éxito')),
      catchError(error => {
        console.error('Error creando categoría:', error);
        return of(null);
      })
    );
  }

  /** 🔹 Actualizar una categoría existente */
  updateCategory(id: number, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updateData).pipe(
      tap(() => console.log(`Categoría actualizada ID: ${id}`)),
      catchError(error => {
        console.error(`Error actualizando categoría ID: ${id}`, error);
        return of(null);
      })
    );
  }

  /** 🔹 Eliminar una categoría */
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Categoría eliminada ID: ${id}`)),
      catchError(error => {
        console.error(`Error eliminando categoría ID: ${id}`, error);
        return of();
      })
    );
  }
}
