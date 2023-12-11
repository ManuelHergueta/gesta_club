import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-partido',
  templateUrl: './form-partido.component.html',
  styleUrls: ['./form-partido.component.css']
})

export class FormPartidoComponent {

  partidoForm: FormGroup = new FormGroup({});

  constructor ( private fb: FormBuilder ) {
    this.partidoForm = this.fb.group({
      categoria_id: ['', Validators.required],
      contrincante: ['', Validators.required],
      competicion: ['', Validators.required],
      fecha_partido: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.partidoForm.valid) {
      console.log(this.partidoForm.value);
      //Enviar al back
    }
  }

}
