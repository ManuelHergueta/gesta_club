import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelInventarioComponent } from './panel-inventario/panel-inventario.component';



const routes: Routes = [
  {
    path:'',
    component: PanelInventarioComponent,
    children: [
      {  path: 'inventario', component: PanelInventarioComponent, data: { titulo: 'Panel Inventario', panel: 'Panel del inventario'}},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InventarioRoutingModule { }
