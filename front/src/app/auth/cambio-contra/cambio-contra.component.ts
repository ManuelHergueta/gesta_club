import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';

import { UsuarioLogin } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cambio-contra',
  templateUrl: './cambio-contra.component.html',
  styleUrls: ['./cambio-contra.component.css']
})

export class CambioContraComponent implements OnInit {

  email: string = '';
  passDistintas: boolean = false;
  exitoCambioContra: boolean = false;
  falloCambioContra: boolean = false;
  formCambioContra: FormGroup = new FormGroup({});

  nuevoUsuario: UsuarioLogin = {
    email: '',
    password: ''
  }

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.passDistintas = false;
    this.exitoCambioContra = false;
    this.falloCambioContra = false;
    this.route.paramMap.subscribe(params => {
      this.email = params.get('email')!;
    });

    this.formCambioContra = this.fb.group({
      pass1: new FormControl('', [Validators.required]),
      pass2: new FormControl('', [Validators.required]),
    });
  }

  cambiarContra() {

    if(this.formCambioContra.get('pass1')?.value == this.formCambioContra.get('pass2')?.value) {

      this.passDistintas = false;

      const passHash = Md5.hashStr(this.formCambioContra.get('pass1')?.value);

      this.nuevoUsuario.email = this.email;
      this.nuevoUsuario.password = passHash;

      this.authService.cambioContra(this.nuevoUsuario).subscribe(resp => {

        if (resp.success) {
          this.mostrarAvisoYRedirigir();
        } else {
          this.falloCambioContra = true;
        }
      })

    } else {
      this.passDistintas = true;
    }
  }

  mostrarAvisoYRedirigir(): void {
    this.exitoCambioContra = true;
    setTimeout(() => {
      this.exitoCambioContra = false;
      this.router.navigate(['auth/login']);
    }, 5000);
  }

  hacerLogin() {
    this.router.navigate(['auth/login']);
  }

}
