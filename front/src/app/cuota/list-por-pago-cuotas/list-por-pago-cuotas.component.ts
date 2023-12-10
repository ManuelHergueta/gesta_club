import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuota } from '../interfaces/cuota.interface';
import { CuotaService } from '../services/cuota.service';

@Component({
  selector: 'app-list-por-pago-cuotas',
  templateUrl: './list-por-pago-cuotas.component.html',
  styleUrls: ['./list-por-pago-cuotas.component.css']
})

export class ListPorPagoCuotasComponent implements OnInit {

  public cuotas: Cuota[] = [];
  public tipoPago: string = '';
  public cuotasPaginadas: Cuota[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;


  constructor (
    private route: ActivatedRoute,
    private cuotaService: CuotaService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tipoPago = params.get('tipoPago') || '';
      if(this.tipoPago) {
        this.cargarCuotasXtipoPago(this.tipoPago);
      }
    });
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


  cargarCuotasXtipoPago(tipo: string) {
    this.cuotaService.listarCuotasPorTipo(tipo).subscribe((cuotas) => {
      this.cuotas = cuotas;
      this.actualizarPaginacion();
    })
  }

}
