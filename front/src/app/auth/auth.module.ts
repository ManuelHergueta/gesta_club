import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecuperaPassComponent } from './recupera-pass/recupera-pass.component';
import { CambioContraComponent } from './cambio-contra/cambio-contra.component';



@NgModule({
  declarations: [
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    RecuperaPassComponent,
    CambioContraComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
