import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private uploadUrl = '/assets/images/'; // Ruta de almacenamiento

  constructor(private http: HttpClient) {}

  /**
   * Sube un archivo al servidor
   */
  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    //Va a dar error porque angukar no deja escribir en la carpeta de la ruta, tiene queser en el backend

    return this.http.post<{ url: string }>(this.uploadUrl, formData).pipe(
      map((response) => response.url),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al subir archivo:', error);
        return throwError(() => new Error('Error al subir archivo.'));
      })
    );
  }

  uploadFileSimulado(file: File): Observable<string> {
    const fileUrl = URL.createObjectURL(file); // Genera una URL temporal
    return of(fileUrl); // Simula la subida devolviendo la URL temporal
  }
}
