import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  changeLanguage(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    console.log(`Idioma seleccionado: ${selectedLanguage}`);
    // Aquí puedes agregar lógica para cambiar el idioma en tu aplicación
  }
}
