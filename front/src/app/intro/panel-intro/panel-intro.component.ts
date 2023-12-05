import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { IntroService } from '../services/intro.service';

@Component({
  selector: 'app-panel-intro',
  templateUrl: './panel-intro.component.html',
  styleUrls: ['./panel-intro.component.css']
})
export class PanelIntroComponent implements OnInit {

  constructor (
    private sharedService: SharedService,
    private introService: IntroService) {}

  ngOnInit(): void {
  this.introService.verificarPermiso();
  }

  cerrarSesion() {
    this.sharedService.cerrarSesionServicio();

  }

}
