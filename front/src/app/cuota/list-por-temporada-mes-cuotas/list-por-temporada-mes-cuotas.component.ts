import { Component, OnInit } from '@angular/core';

import { Cuota } from '../interfaces/cuota.interface';
import { ActivatedRoute } from '@angular/router';
import { CuotaService } from '../services/cuota.service';
import { ReclamacionService } from '../services/reclamacion.service';

@Component({
  selector: 'app-list-por-temporada-mes-cuotas',
  templateUrl: './list-por-temporada-mes-cuotas.component.html',
  styleUrls: ['./list-por-temporada-mes-cuotas.component.css']
})
export class ListPorTemporadaMesCuotasComponent implements OnInit{

  public cuotas: Cuota[] = [];
  public temporada: number = 0;
  public mes: string = '';
  public temporadaMes: string = ''
  public cuotasPaginadas: Cuota[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;

  constructor(
    private route: ActivatedRoute,
    private cuotaService: CuotaService,
    private reclamacionService: ReclamacionService ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const temporadaMes = params.get('temporadaMes');
      if(temporadaMes) {
        const [temporadaCadena, mes] = temporadaMes.split(',');
        this.temporada = parseInt(temporadaCadena);
        this.mes = mes || '';
      }
      if(!isNaN(this.temporada) && this.mes){

        this.cargarCuotasXTemporadaYMes(this.temporada,this.mes);
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

  cargarCuotasXTemporadaYMes(temporada:number,mes:string) {
    this.cuotaService.listarCuotasPorTemporadaYMes(temporada,mes).subscribe( (cuotas) => {
      if (cuotas && 'msg' in cuotas) {
        //Esto se hace para que no salte error si no devuelve cuotas, ya que en ese caso
        //devuelve un objeto con un mensaje, en vez de una array
        this.cuotas = [];
      } else {
        this.cuotas = cuotas;
        this.actualizarPaginacion();
      }
    })
  }

  llamarEnviarReclamacion(cuota: Cuota) {
    this.reclamacionService.enviarReclamacion(cuota);
  }

}
