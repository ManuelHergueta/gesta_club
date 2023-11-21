import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecuperaPassComponent } from './recupera-pass/recupera-pass.component';
import { CambioContraComponent } from './cambio-contra/cambio-contra.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: '', component: InicioComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'recuperapass', component: RecuperaPassComponent },
      { path: 'cambiocontra/:email', component: CambioContraComponent },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
