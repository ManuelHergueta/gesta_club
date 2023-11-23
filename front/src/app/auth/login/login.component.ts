import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorLogin: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    ) {}

    ngOnInit(): void {
      this.errorLogin = false;
      this.formLogin = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      pass: new FormControl('', [Validators.required]),
    });
    }

    hacerLogin() {

      if (this.formLogin.valid) {

        const passHash = Md5.hashStr(this.formLogin.value.pass);

        this.authService.login({email:this.formLogin.value.email,password:passHash}).subscribe(resp => {
          if (resp.success) {
            sessionStorage.setItem('usuario', JSON.stringify(resp.data));
            this.errorLogin = false;
            console.log('LOGIN CORRECTO');
            this.router.navigate(['cuota/listadoC']);
          } else {
            this.errorLogin = true;
          }
          //console.log(`error? ${this.errorLogin}`);
        });
      } else {
        this.formLogin.markAllAsTouched();
        for (const key in this.formLogin.controls) {
          this.formLogin.controls[key].markAsDirty();
        }
        return;
      }
    }

    recordarPass() {
      this.router.navigate(['auth/recuperapass']);
    }

    registrarse() {
      this.router.navigate(['auth/register']);
    }

}
