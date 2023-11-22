import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recupera-pass',
  templateUrl: './recupera-pass.component.html',
  styleUrls: ['./recupera-pass.component.css']
})

export class RecuperaPassComponent implements OnInit {

  formOlvidada: FormGroup = new FormGroup({});
  enviadasInstruc: boolean = false;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.enviadasInstruc = false;
    this.formOlvidada = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])
    })
  }

  solicitarCambio() {
    if(this.formOlvidada.valid) {
      this.AuthService.existe(this.formOlvidada.value.email).subscribe(resp => {

        if(resp.success) {
          console.log('El email si existe en la BD');
        } else {
          console.log('este email no existe en la BD');
        }
        //Tanto si existe como si no, mostramos el mensaje de enviadas instrucciones; POR SEGURIDAD
        this.enviadasInstruc = true;
        setTimeout(() => {
          this.enviadasInstruc = false;
          this.router.navigate(['auth/login']);
        }, 5000);
      })
    }
  }

  hacerLogin() {
    this.router.navigate(['auth/login']);
  }

  registrarse() {
    this.router.navigate(['auth/register']);
  }


}
