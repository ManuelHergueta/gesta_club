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
      if (cuotas && 'msg' in cuotas) {
        //Esto se hace para que no salte error si se le pasa, en el modal de Listado por persona,
        //un dni que no exista en la BD porque cuotas espera una array no el mensaje de error que
        //manda el back cuando no existe el dni.
        this.cuotas = [];
      } else {
        this.cuotas = cuotas;
      }
    });
  }

  obtenerDeportista(dni: string) {
    this.cuotaService.obtenerDeportistaPorDni(dni).subscribe( (datosDeportista) => {
      this.deportista = datosDeportista;
    })
  }

}
