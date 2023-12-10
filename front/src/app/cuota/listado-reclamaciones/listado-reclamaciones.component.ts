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

  constructor (
    private reclamacionService: ReclamacionService
  ) {}

  ngOnInit(): void {
    this.cargarListadoReclamaciones();
  }

  cargarListadoReclamaciones () {
    this.reclamacionService.listarReclamaciones().subscribe((reclamaciones) => {
      this.reclamaciones = reclamaciones;
    })
  }

}
