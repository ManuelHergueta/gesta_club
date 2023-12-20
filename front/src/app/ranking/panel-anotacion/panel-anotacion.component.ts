import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  tiempoRestante: number = 0;
  cronometro: any;
  cronometroActivo: boolean = false;


  constructor(
    private partidoService: PartidoService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef ) { }


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

  solicitarTiempoPartida() {
    Swal.fire({
      title: 'Ingresa la duración del partido (minutos)',
      input: 'number',
      inputAttributes: {
        min: '1',
        max: '120',
        step: '1'
      },
      showCancelButton: true,
      confirmButtonText: 'Establecer',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.tiempoRestante = result.value * 60; // Convertir minutos a segundos
        // Puedes llamar aquí a una función para mostrar el cronómetro o simplemente mostrarlo en el template
      }
    });
  }

  iniciarCronometro() {
    console.log('INICIADO EL CRONOMETOR');
    if (!this.cronometroActivo) {
      this.cronometro = setInterval(() => {
        console.log(`Tiempo restante: ${this.tiempoRestante}`);
        if (this.tiempoRestante > 0) {
          this.tiempoRestante--;
          this.cdRef.detectChanges(); // Detecta los cambios manualmente
        } else {
          this.pausarCronometro();
        }
      }, 1000);
      this.cronometroActivo = true;
    }
  }

  obtenerTiempoFormato(tiempo: number): string {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    return `${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
  }

  pausarCronometro() {
    if (this.cronometro) {
      clearInterval(this.cronometro);
      this.cronometroActivo = false;
    }
  }

  resetCronometro() {
    if (!this.cronometroActivo) {
      this.tiempoRestante = 0;
      // También podrías establecer aquí un tiempo predeterminado si lo deseas
      // Por ejemplo, para 30 minutos: this.tiempoRestante = 30 * 60;
    } else {
      console.warn("El cronómetro debe estar detenido para reiniciarlo");
    }
  }

  // Funciones adicionales como resetearCronometro, pausarCronometro, etc., según tus necesidades

}
