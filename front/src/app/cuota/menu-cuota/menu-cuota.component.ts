import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-cuota',
  templateUrl: './menu-cuota.component.html',
  styleUrls: ['./menu-cuota.component.css']
})
export class MenuCuotaComponent implements OnInit {

  currentRoute: string = '';
  public dni: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {

  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  setActive(route: string): void {
    this.currentRoute = route;
  }

  async preguntarDni() {
    const { value: dni } = await Swal.fire({
        title: 'DNI',
        input: 'text',
        inputLabel: 'Ingrese un DNI',
        inputPlaceholder: 'Escriba su DNI aquí',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas escribir un DNI!';
            }
            return null;
        }
    });
    if (dni) {
        this.dni = dni;
        this.router.navigate([`/cuota/listXdni/${this.dni}`]);
    }
  }


}
