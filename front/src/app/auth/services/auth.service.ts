import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environments';
import * as interfaces from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private urlApi = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registro(usuario: interfaces.UsuarioRegister) {
    return this.http.post<interfaces.Register>(`${this.urlApi}/usuarios`, usuario);
  }

  login(usuario: interfaces.UsuarioLogin) {
    return this.http.post<interfaces.Auth>(`${this.urlApi}/auth/login`, usuario);
  }

  existe(email: string) {
    return this.http.get<interfaces.ExisteResponse>(`${this.urlApi}/usuarios/existeEmail/${email}`);
  }

  cambioContra(usuario: interfaces.UsuarioLogin) {
    return this.http.post<interfaces.Register>(`${this.urlApi}/usuarios/cambioContra`, usuario);
  }

}
