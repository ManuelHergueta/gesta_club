import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor (private router: Router) {}

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  goToRegister(): void {
    this.router.navigate(['auth/register']);
  }
}
