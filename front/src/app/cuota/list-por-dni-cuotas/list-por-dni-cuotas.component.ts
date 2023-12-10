import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cuota, Deportista } from '../interfaces/cuota.interface';
import { CuotaService } from '../services/cuota.service';
import { ReclamacionService } from '../services/reclamacion.service';

@Component({
  selector: 'app-list-por-dni-cuotas',
  templateUrl: './list-por-dni-cuotas.component.html',
  styleUrls: ['./list-por-dni-cuotas.component.css']
})
export class ListPorDniCuotasComponent implements OnInit {

  public cuotas: Cuota[] = [];
  public deportista: Deportista | null = null;
  public dni: string = '';
  public cuotasPaginadas: Cuota[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;

  constructor (
    private route: ActivatedRoute,
    private cuotaService: CuotaService,
    private reclamacionService: ReclamacionService ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dni = params.get('dni') || '';
      if (this.dni) {
        this.cargarCuotasXdni(this.dni);
        this.obtenerDeportista(this.dni);
      }
    })
  }

  actualizarPaginacion() {
    const comienzo = (this.paginaActual - 1) * this.itemsXpagina;
    const final = comienzo + this.itemsXpagina;
    this.cuotasPaginadas = this.cuotas.slice(comienzo, final);
  }

  siguiente() {
    this.paginaActual++;
    this.actualizarPaginacion();
  }

  anterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
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
        this.actualizarPaginacion();
      }
    });
  }

  obtenerDeportista(dni: string) {
    this.cuotaService.obtenerDeportistaPorDni(dni).subscribe( (datosDeportista) => {
      this.deportista = datosDeportista;
    })
  }

  llamarEnviarReclamacion(cuota: Cuota) {
    this.reclamacionService.enviarReclamacion(cuota);
  }

}
