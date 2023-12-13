import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Deportista } from 'src/app/cuota/interfaces/cuota.interface';
import { PartidoService } from '../services/partido.service';
import { Alineacion, Partido } from '../interfaces/ranking.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-alineacion',
  templateUrl: './panel-alineacion.component.html',
  styleUrls: ['./panel-alineacion.component.css']
})

export class PanelAlineacionComponent implements OnInit {

  jugadores: Deportista[] = [];
  alineacion: Deportista[] = [];
  id_partido: number = 0;
  partido: Partido | null = null;
  cambiosRealizados: boolean = false;


  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private partidoService: PartidoService
  ) { }


ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.id_partido = parseInt(params.get('id') || '');
  })
  this.cargarDeportistas();
  this.traerDatosDelPartido();
  this.cargarAlineacionPartido();
}

cargarDeportistas() {
  this.partidoService.listarDeportistas().subscribe((deportistas) => {
    this.jugadores = deportistas;
  });
}

traerDatosDelPartido() {
  this.partidoService.obtenerDatosPartido(this.id_partido).subscribe((partido) => {
    this.partido = partido;
  })
}

/**
 * Cargar la alineación existente para un patido específico. Transforma los DNI`s de la
 * alineación en objetos Deportista y actualiza la lista de jugadores disponibles para
 * reflejar los que ya están en la alineacion
 */
cargarAlineacionPartido() {
  this.partidoService.obtenerAlineacionPartido(this.id_partido).subscribe(alineaciones => {
    // Transformar DNIs en objetos Deportista
    // map convierte cada elem. de 'alineaciones' (que sea un DNI) en un obj Deportista
    this.alineacion = alineaciones.map(alineacion => {
      //buscar en jugadores un Deportista que coincida su dni con el dni_deportista de alineaciones
      return this.jugadores.find(j => j.dni === alineacion.dni_deportista);
      //se filtra para eliminar cualquier undefined que pudiera haber sido añadido
      //Así se quita el error que nos marca en this.alineacion
      //undefined se pudiera generar si un dni no corresponde a un Deportista en jugadores.
    }).filter(jugador => jugador !== undefined) as Deportista[];

    // Quitar los jugadores ya convocados de la lista de disponibles
    this.alineacion.forEach(jugadorAlineado => {
      this.jugadores = this.jugadores.filter(jugador => jugador.dni !== jugadorAlineado.dni);
    });
  })
}

drop(event: CdkDragDrop<Deportista[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
    this.cambiosRealizados = true;
  }
}

guardarAlineacion() {
  const alineacionFinal: Alineacion[] = this.alineacion.map(jugador => ({
    id_partido: this.id_partido,
    dni_deportista: jugador.dni
  }));
  this.partidoService.guardarAlineacionPartido(alineacionFinal).subscribe({
    next: (respuesta) => {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Alineación guardada correctamente.',
        icon: 'success'
      });
      this.cambiosRealizados = false;
    },
    error: (error) => {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar la alineación.',
        icon: 'error'
      });
    }
  });
}

salir() {
  if(this.cambiosRealizados) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Los cambios no guardados se perderán.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'No, quedarme aquí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/ranking/listPartidos']);
      }
    });
  } else {
    this.router.navigate(['/ranking/listPartidos']);
  }
}

}
