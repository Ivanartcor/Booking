import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required]]
    });
  }

  // Método de envío del formulario
  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      const serviceId = 'service_dybp3av';  // Reemplaza con tu Service ID
      const templateId = 'template_74ofzop';  // Reemplaza con tu Template ID
      const publicKey = 'nM6UIy6BmBA_c7Nht';  // Reemplaza con tu Public Key

      const templateParams = {
        user_name: formData.nombre,
        user_email: formData.email,
        user_message: formData.mensaje
      };

      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then(response => {
          console.log('Correo enviado con éxito!', response);
          alert('¡Mensaje enviado correctamente!');
          this.contactForm.reset();
        })
        .catch(error => {
          console.error('Error al enviar el correo:', error);
          alert('Hubo un problema al enviar el mensaje. Inténtalo más tarde.');
        });
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }
}
