import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesUrl = 'assets/data/companies-categories.json';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las categorías desde el archivo JSON
   */
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriesUrl);
  }

  /**
   * Obtiene una categoría específica por su ID
   */
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any[]>(this.categoriesUrl).pipe(
      map((categories) => categories.find((c) => c.id === categoryId))
    );
  }

  /**
   * Agrega una nueva categoría (simulado)
   */
  addCategory(newCategory: any): Observable<boolean> {
    console.log('Categoría agregada:', newCategory);
    return of(true); // Simula el éxito
  }

  /**
   * Elimina una categoría por ID (simulado)
   */
  deleteCategory(categoryId: number): Observable<boolean> {
    console.log(`Categoría con ID ${categoryId} eliminada.`);
    return of(true); // Simula la eliminación exitosa
  }
}
