import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent {
  constructor(private router: Router) {}

  logout() {
    // Aquí puedes agregar la lógica de cierre de sesión, como borrar el token
    console.log('Cerrando sesión...');
    this.router.navigate(['/auth/login']); // Redirigir a la página de login
  }
}
