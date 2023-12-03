import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cuota, Deportista } from '../interfaces/cuota.interface';
import { CuotaService } from '../services/cuota.service';

@Component({
  selector: 'app-list-por-dni-cuotas',
  templateUrl: './list-por-dni-cuotas.component.html',
  styleUrls: ['./list-por-dni-cuotas.component.css']
})
export class ListPorDniCuotasComponent implements OnInit {

  public cuotas: Cuota[] = [];
  public deportista: Deportista | null = null;
  public dni: string = '';

  constructor (
    private route: ActivatedRoute,
    private cuotaService: CuotaService ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dni = params.get('dni') || '';
      if (this.dni) {
        this.cargarCuotasXdni(this.dni);
        this.obtenerDeportista(this.dni);
      }
    })
  }

  cargarCuotasXdni(dni: string) {
    this.cuotaService.listarCuotasPorDni(dni).subscribe( (cuotas) => {
      this.cuotas = cuotas;
      //console.log(cuotas);
    })
  }

  obtenerDeportista(dni: string) {
    this.cuotaService.obtenerDeportistaPorDni(dni).subscribe( (datosDeportista) => {
      this.deportista = datosDeportista;
    })
  }

}
