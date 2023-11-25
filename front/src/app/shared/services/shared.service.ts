import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private router: Router) { }

  cerrarSesionServicio() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
