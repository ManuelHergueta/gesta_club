import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Categoria, Partido } from '../interfaces/ranking.interface';
import { PartidoService } from '../services/partido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-partido',
  templateUrl: './form-partido.component.html',
  styleUrls: ['./form-partido.component.css']
})

export class FormPartidoComponent implements OnInit {

  partidoForm: FormGroup = new FormGroup({});
  categorias: Categoria[] = [];
  partido: Partido | null = null;


  constructor (
    private router: Router,
    private partidoService: PartidoService,
    private fb: FormBuilder ) {

    this.partidoForm = this.fb.group({
      categoria_id: ['', Validators.required],
      contrincante: ['', Validators.required],
      competicion: ['', Validators.required],
      fecha_partido: ['', Validators.required]
    });

  }
  ngOnInit(): void {
    this.cargarCategorias();
  }

  onSubmit() {
    if (this.partidoForm.valid) {
      this.partido = this.partidoForm.value;
      console.log(this.partido);
      this.partidoService.crearPartido(this.partido!).subscribe({
        next: (respuesta) => {
          this.mostrarRespuestaExitosa();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al crear la cuota: ',
            icon: 'error'
          });
        }
      })
    }
  }

  cargarCategorias() {
    this.partidoService.obtenerCategorias().subscribe ((categorias) => {
      this.categorias = categorias;
    });
  }

  mostrarRespuestaExitosa() {
    Swal.fire({
      title: 'Exito',
      text: 'El partido se ha creado correctamente.',
      icon: 'success',
      confirmButtonText: 'Ver Partidos',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/ranking/listPartidos']);
      }
    });
  }
}
