import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

import { UsuarioRegister } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = new FormGroup({});
  passDistintas: boolean = false;
  falloRegistroBack: boolean = false;
  exitoRegistroBack: boolean = false;

  nuevoUsuario: UsuarioRegister = {
    nombre: '',
    email: '',
    password: ''
  }

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passDistintas = false;
    this.falloRegistroBack = false;
    this.exitoRegistroBack = false;

    this.formRegister = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      pass1: new FormControl('', [Validators.required]),
      pass2: new FormControl('', [Validators.required]),
      check: new FormControl('', [Validators.required]),
    });
  }

  registrarse() {

    if(this.formRegister.get('pass1')?.value == this.formRegister.get('pass2')?.value) {

      this.passDistintas = false;

      const passHash = Md5.hashStr(this.formRegister.get('pass1')?.value);

      this.nuevoUsuario.nombre = this.formRegister.value.nombre;
      this.nuevoUsuario.email = this.formRegister.value.email;
      this.nuevoUsuario.password = passHash;

      this.authService.registro(this.nuevoUsuario).subscribe(resp => {

        console.log(resp);
        if (resp.success) {

          this.mostrarAvisoYRedirigir();

        } else {
          //Este salta si existe el email en la BD y también si se produce algún error en el registro en el back
          //No informo que ya existe el email en la BD por seguridad
          this.falloRegistroBack = true;
        }
      })
    } else {
      this.passDistintas = true;
    }
  }

  mostrarAvisoYRedirigir(): void {
    this.exitoRegistroBack = true;
    setTimeout(() => {
      this.exitoRegistroBack= false;
      this.router.navigate(['auth/login']);
    }, 5000);
  }

  hacerLogin() {
    this.router.navigate(['auth/login'])
  }

}
