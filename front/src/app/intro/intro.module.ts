import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { IntroRoutingModule } from './intro-routing.module';

import { PanelIntroComponent } from './panel-intro/panel-intro.component';



@NgModule({
  declarations: [
    PanelIntroComponent
  ],
  imports: [
    SharedModule,
    IntroRoutingModule
  ]
})
export class IntroModule { }
