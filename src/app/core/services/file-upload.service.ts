import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // URL base para la subida de archivos (ajústala según tu configuración)
  private uploadUrl = 'http://localhost:3000/upload';

  constructor(private http: HttpClient) {}

  /**
   * Sube un archivo al backend.
   * @param file Archivo a subir.
   * @returns Un observable con la respuesta del servidor.
   */
  uploadFile(file: File): Observable<HttpEvent<any>> {
    // Creamos un objeto FormData para enviar el archivo
    const formData: FormData = new FormData();
    formData.append('file', file);

    // Creamos una petición HTTP para monitorear el progreso
    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    // Retornamos el observable que permite seguir el progreso y obtener la respuesta
    return this.http.request(req);
  }
}
