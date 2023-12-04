import { Component, OnInit } from '@angular/core';
import { CuotaService } from '../services/cuota.service';
import { Cuota } from '../interfaces/cuota.interface';

@Component({
  selector: 'app-listado-cuotas',
  templateUrl: './listado-cuotas.component.html',
  styleUrls: ['./listado-cuotas.component.css']
})
export class ListadoCuotasComponent implements OnInit {

  public cuotas: Cuota[] = [];

  constructor( private cuotaService: CuotaService ) { }

  ngOnInit(): void {
    this.cargarHistoricoCuotas();
  }

  cargarHistoricoCuotas () {
      this.cuotaService.listarHistoricoCuotasConNombre().subscribe( cuotas => {
      this.cuotas = cuotas;
    })
  }

}
