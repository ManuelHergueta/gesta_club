import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioModule)
  },
  {
    path: 'ficha',
    loadChildren: () => import('./ficha/ficha.module').then( m => m.FichaModule)
  },
  {
    path: 'cuota',
    loadChildren: () => import('./cuota/cuota.module').then( m => m.CuotaModule)
  },
  {
    path: 'presencia',
    loadChildren: () => import('./presencia/presencia.module').then( m => m.PresenciaModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./inventario/inventario.module').then( m => m.InventarioModule)
  },
  {
    path: 'ranking',
    loadChildren: () => import('./ranking/ranking.module').then( m => m.RankingModule)
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
