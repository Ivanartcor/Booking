import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/core/services/cookie.service';

@Component({
  selector: 'app-cookie-modal',
  templateUrl: './cookie-modal.component.html',
  styleUrls: ['./cookie-modal.component.scss']
})
export class CookieModalComponent implements OnInit {
  showModal: boolean = true;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    if (this.cookieService.hasAcceptedCookies() || this.cookieService.hasRejectedCookies()) {
      this.showModal = false; // Si ya aceptó/rechazó, no mostrar modal
    }
  }

  acceptCookies() {
    this.cookieService.acceptCookies();
    this.showModal = false;
  }

  rejectCookies() {
    this.cookieService.rejectCookies();
    this.showModal = false;
  }
}
