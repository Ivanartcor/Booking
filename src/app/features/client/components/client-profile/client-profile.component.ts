import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  currentUser: any;
  editUser: any = {};
  showEditModal = false;
  uploadError: string | null = null;

  constructor(
    private authService: AuthService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  editProfile(): void {
    this.editUser = { ...this.currentUser };
    this.showEditModal = true;
  }

  saveProfile(): void {
    this.currentUser = { ...this.editUser };
    this.authService.updateCurrentUser(this.currentUser);
    this.closeEditModal();
    alert('Perfil actualizado con éxito.');
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.uploadError = null;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];
      
      this.fileUploadService.uploadFile(file).subscribe({
        next: (url) => {
          this.editUser.profilePicture = url;
          this.authService.updateProfilePicture(url); 
          alert('Foto de perfil actualizada con éxito.');
        },
        error: () => {
          this.uploadError = 'Error al subir el archivo.';
        }
      });
    }
  }

  onFileSelectedTemporal(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];
  
      // Genera una URL temporal para la vista previa
      this.fileUploadService.uploadFileSimulado(file).subscribe({
        next: (url) => {
          this.editUser.profilePicture = url; // Actualiza la vista previa
          alert('Imagen seleccionada correctamente.');
        },
        error: () => {
          this.uploadError = 'Error al cargar la imagen.';
        }
      });
    }
  }
  
}
