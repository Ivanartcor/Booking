import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieModalComponent } from '../features/cookie-modal/cookie-modal.component';



@NgModule({
  declarations: [CookieModalComponent], // Declaramos el modal aquí
  imports: [CommonModule],
  exports: [CookieModalComponent] // Lo exportamos para usarlo en otros módulos
})
export class SharedCookiesModule { }
