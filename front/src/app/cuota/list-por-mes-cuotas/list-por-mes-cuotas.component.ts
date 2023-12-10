import { Component, OnInit } from '@angular/core';

import { Cuota } from '../interfaces/cuota.interface';
import { CuotaService } from '../services/cuota.service';
import { ActivatedRoute } from '@angular/router';
import { ReclamacionService } from '../services/reclamacion.service';

@Component({
  selector: 'app-list-por-mes-cuotas',
  templateUrl: './list-por-mes-cuotas.component.html',
  styleUrls: ['./list-por-mes-cuotas.component.css']
})
export class ListPorMesCuotasComponent implements OnInit {

  public cuotas: Cuota[] = [];
  public mes: string = '';
  public cuotasPaginadas: Cuota[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;

  constructor (
    private route: ActivatedRoute,
    private cuotaService: CuotaService,
    private reclamacionService: ReclamacionService ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mes = params.get('mes') || '';
      if(this.mes) {
        this.cargarCuotasXmes(this.mes);

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

  cargarCuotasXmes(mes: string) {
    this.cuotaService.listarCuotasPorMes(mes).subscribe( (cuotas) => {
      this.cuotas = cuotas;
      this.actualizarPaginacion();
    });
  }

  llamarEnviarReclamacion(cuota: Cuota) {
    this.reclamacionService.enviarReclamacion(cuota);
  }

}
