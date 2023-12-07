import { Component, OnInit } from '@angular/core';
import { Deportista } from 'src/app/cuota/interfaces/cuota.interface';
import { FichaService } from '../services/ficha.service';

@Component({
  selector: 'app-listado-fichas',
  templateUrl: './listado-fichas.component.html',
  styleUrls: ['./listado-fichas.component.css']
})
export class ListadoFichasComponent implements OnInit {

  public deportistas: Deportista[] = [];

  constructor( private fichaService: FichaService ) { }

  ngOnInit(): void {
    this.cargarListadoDeportistas();
  }

  cargarListadoDeportistas() {
    this.fichaService.listarDeportistas().subscribe( fichas => {
      this.deportistas = fichas;
    })
  }
}
