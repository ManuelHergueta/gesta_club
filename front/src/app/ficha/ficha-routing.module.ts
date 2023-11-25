import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelFichaComponent } from './panel-ficha/panel-ficha.component';


const routes: Routes = [
  {
    path:'',
    component: PanelFichaComponent,
    children: [
      { path: 'ficha', component: PanelFichaComponent, data: { titulo: 'Panel Deportista', panel: 'Panel de Deportistas'} },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FichaRoutingModule { }
