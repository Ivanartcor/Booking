import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'client'; // Rol por defecto
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.isLoading = true;
    const userData = { name: this.name, email: this.email, password: this.password, role: this.role };

    this.authService.register(userData).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.successMessage = 'Registro exitoso. Redirigiendo...';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/auth/login']), 2000); // Redirigir tras 2 segundos
        } else {
          this.errorMessage = 'Error en el registro. Inténtelo de nuevo.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error en el registro:', err);
        this.errorMessage = 'Ocurrió un error. Inténtelo más tarde.';
      },
    });
  }

  sendWelcomeEmail() {
    const serviceId = 'service_dybp3av'; // Reemplaza con tu service ID
    const templateId = 'template_5l9pb7l'; // Reemplaza con tu template ID
    const publicKey = 'nM6UIy6BmBA_c7Nht'; // Reemplaza con tu public key

    const templateParams = {
      user_name: this.name,
      user_email: this.email,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Correo enviado con éxito!', response);
      }, (error) => {
        console.error('Error al enviar el correo:', error);
      });
  }
}
