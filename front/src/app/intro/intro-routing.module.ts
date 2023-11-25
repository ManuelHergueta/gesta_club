import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelIntroComponent } from './panel-intro/panel-intro.component';



const routes: Routes = [
  {
    path:'',
    component: PanelIntroComponent,
    children: [
      { path:'intro', component: PanelIntroComponent, data: { titulo: 'Intro App', panel: 'Panel Intro App'} },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IntroRoutingModule { }
