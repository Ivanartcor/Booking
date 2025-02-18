import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

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
  isUpdating: boolean = false;
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  /** 🔹 Cargar perfil del usuario autenticado */
  loadUserProfile(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.editUser = { ...user }; // Copia para edición sin afectar los datos originales
      }
    });
  }

  /** 🔹 Abrir modal de edición */
  editProfile(): void {
    this.showEditModal = true;
    this.successMessage = '';
    this.uploadError = null;
  }

  /** 🔹 Guardar cambios en el perfil */
  saveProfile(): void {
    this.isUpdating = true;

    this.authService.updateUser(this.editUser).subscribe({
      next: () => {
        this.successMessage = 'Perfil actualizado con éxito.';
        this.isUpdating = false;
        this.showEditModal = false;
      },
      error: () => {
        this.uploadError = 'Error al actualizar el perfil.';
        this.isUpdating = false;
      }
    });
  }

  /** 🔹 Cerrar modal */
  closeEditModal(): void {
    this.showEditModal = false;
    this.uploadError = null;
    this.successMessage = '';
  }

  /** 🔹 Subir imagen de perfil */
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];

      this.authService.uploadProfilePicture(file).subscribe({
        next: (res) => {
          if (res && res.filePath) {
            this.editUser.profile_picture = res.filePath; // Actualiza la vista previa
            this.successMessage = 'Foto de perfil actualizada con éxito.';
          }
        },
        error: () => {
          this.uploadError = 'Error al subir la imagen.';
        }
      });
    }
  }
}

