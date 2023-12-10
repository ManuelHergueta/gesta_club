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

  cargarCuotasXtipoPago(tipo: string) {
    this.cuotaService.listarCuotasPorTipo(tipo).subscribe((cuotas) => {
      this.cuotas = cuotas;
    })
  }

}
