import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-panel-intro',
  templateUrl: './panel-intro.component.html',
  styleUrls: ['./panel-intro.component.css']
})
export class PanelIntroComponent {

  constructor (private sharedService: SharedService) {}

  cerrarSesion() {
    this.sharedService.cerrarSesionServicio();

  }
  
}
