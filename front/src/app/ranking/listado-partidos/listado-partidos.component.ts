import { Component, OnInit } from '@angular/core';
import { Partido } from '../interfaces/ranking.interface';
import { PartidoService } from '../services/partido.service';


@Component({
  selector: 'app-listado-partidos',
  templateUrl: './listado-partidos.component.html',
  styleUrls: ['./listado-partidos.component.css']
})

export class ListadoPartidosComponent implements OnInit {

  public partidos: Partido[] = [];
  public partidosPaginados: Partido[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;

  constructor (
    private partidoService: PartidoService ) { }

  ngOnInit(): void {
    this.cargarListadoPartidos();
  }

  cargarListadoPartidos() {
    this.partidoService.listarPartidosConCategoria().subscribe( (partidos) => {
      this.partidos = partidos;
      this.actualizarPaginacion();
    })
  }


  actualizarPaginacion() {
    const comienzo = (this.paginaActual - 1) * this.itemsXpagina;
    const final = comienzo + this.itemsXpagina;
    this.partidosPaginados = this.partidos.slice(comienzo, final);
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

}
