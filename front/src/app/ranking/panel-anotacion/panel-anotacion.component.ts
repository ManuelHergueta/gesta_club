import { Component, OnInit } from '@angular/core';
import { PartidoService } from '../services/partido.service';
import { Anotacion, Deportista, Jugada } from '../interfaces/ranking.interface';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-anotacion',
  templateUrl: './panel-anotacion.component.html',
  styleUrls: ['./panel-anotacion.component.css']
})

export class PanelAnotacionComponent implements OnInit {

  jugadas: Jugada[] = [];
  jugadores: Deportista[] = [];
  alineacion: Deportista[] = [];
  afectados: Deportista[] = [];
  id_partido: number = 0;
  jugadaSeleccionada: number = 0;

  constructor(
    private partidoService: PartidoService,
    private route: ActivatedRoute ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_partido = parseInt(params.get('id') || '');
      this.cargarTodosLosJugadores();
      this.cargarJugadas();
      this.cargarJugadoresConvocados();
    })
  }


  cargarJugadas() {
    this.partidoService.obtenerJugadas().subscribe((jugadas) => {
      this.jugadas = jugadas;
    })
  }

  cargarTodosLosJugadores() {
    this.partidoService.listarDeportistas().subscribe((jugadores) => {
      this.jugadores = jugadores;
    });
  }

  cargarJugadoresConvocados() {
    //Explicacion sobre este metodo en panel-alineacion.component.ts
    this.partidoService.obtenerAlineacionPartido(this.id_partido).subscribe(alineaciones => {
      this.alineacion = this.jugadores.filter(jugador =>
        alineaciones.some(alineacion => alineacion.dni_deportista === jugador.dni));
    });
  }

  drop(event: CdkDragDrop<Deportista[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}

  anotarJugada() {
    if(!this.jugadaSeleccionada || this.afectados.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe seleccionar una jugada y los jugadores afectados',
      });
      return;
    }
    const anotacion: Anotacion = {
      id_partido: this.id_partido,
      id_jugada: this.jugadaSeleccionada,
      dni_deportistas: this.afectados.map(jugador => jugador.dni)
    };
    this.partidoService.registrarAnotacion(anotacion).subscribe({
      next: (respuesta) => {
        Swal.fire(
          'Registrado',
          'La jugada ha sido registrada con éxito',
          'success'
        );
        this.alineacion.push(...this.afectados);//Devolverlos a lista convocados
        this.afectados = [];//limpiamos la lista de anotacion
      },
      error: (error) => {
        Swal.fire(
          'Error',
          'Hubo un problema al registrar la jugada',
          'error'
        );
      }
    });
  }

}
