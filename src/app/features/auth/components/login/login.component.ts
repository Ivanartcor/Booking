import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false; // Variable para mostrar el spinner de carga

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    this.isLoading = true; // Inicia la carga

    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        this.isLoading = false; // Finaliza la carga

        if (!success) {
          this.errorMessage = 'Usuario o contraseña incorrectos. Inténtelo de nuevo.';
        } else {
          this.errorMessage = ''; // Limpia el mensaje de error si el login es exitoso
        }
      },
      error: (err) => {
        this.isLoading = false; // Finaliza la carga
        console.error('Error durante la autenticación:', err);
        this.errorMessage = 'Ocurrió un error. Inténtelo más tarde.';
      },
    });
  }
}

