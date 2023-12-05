import { Component, OnInit } from '@angular/core';

import { Cuota } from '../interfaces/cuota.interface';
import { CuotaService } from '../services/cuota.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-por-mes-cuotas',
  templateUrl: './list-por-mes-cuotas.component.html',
  styleUrls: ['./list-por-mes-cuotas.component.css']
})
export class ListPorMesCuotasComponent implements OnInit {

  public cuotas: Cuota[] = [];
  public mes: string = '';

  constructor (
    private route: ActivatedRoute,
    private cuotaService: CuotaService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mes = params.get('mes') || '';
      if(this.mes) {
        this.cargarCuotasXmes(this.mes);

      }
    })
  }

  cargarCuotasXmes(mes: string) {
    this.cuotaService.listarCuotasPorMes(mes).subscribe( (cuotas) => {
      this.cuotas = cuotas;
    });
  }

}
