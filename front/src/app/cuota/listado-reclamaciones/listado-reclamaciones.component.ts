import { Component, OnInit } from '@angular/core';
import { Reclamacion } from '../interfaces/cuota.interface';
import { ReclamacionService } from '../services/reclamacion.service';

@Component({
  selector: 'app-listado-reclamaciones',
  templateUrl: './listado-reclamaciones.component.html',
  styleUrls: ['./listado-reclamaciones.component.css']
})

export class ListadoReclamacionesComponent implements OnInit {

  public reclamaciones: Reclamacion[] = [];
  public reclamacionesPaginadas: Reclamacion[] = [];
  public paginaActual: number = 1;
  public itemsXpagina: number = 12;

  constructor (
    private reclamacionService: ReclamacionService
  ) {}

  ngOnInit(): void {
    this.cargarListadoReclamaciones();
  }

  actualizarPaginacion() {
    const comienzo = (this.paginaActual - 1) * this.itemsXpagina;
    const final = comienzo + this.itemsXpagina;
    this.reclamacionesPaginadas = this.reclamaciones.slice(comienzo, final);
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

  cargarListadoReclamaciones () {
    this.reclamacionService.listarReclamaciones().subscribe((reclamaciones) => {
      this.reclamaciones = reclamaciones;
      this.actualizarPaginacion();
    })
  }

}
