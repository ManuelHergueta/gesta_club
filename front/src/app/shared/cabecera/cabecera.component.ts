import { Component } from '@angular/core';

import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {

  constructor (private sharedService: SharedService) {}

  cerrarSesion() {
    this.sharedService.cerrarSesionServicio();
  }

}
