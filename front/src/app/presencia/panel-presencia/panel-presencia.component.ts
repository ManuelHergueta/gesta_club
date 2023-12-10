import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PresenciaService } from '../services/presencia.service';

@Component({
  selector: 'app-panel-presencia',
  templateUrl: './panel-presencia.component.html',
  styleUrls: ['./panel-presencia.component.css'],
  animations: [
    trigger('slideInAnimation', [
      state('hidden', style({
        transform: 'translateX(-100%)'
      })),
      state('visible', style({
        transform: 'translateX(0)'
      })),
      transition('hidden => visible', animate('500ms ease-in')),
      //TO-DO Animación transición contraria (más adelante se hará)
      //transition('visible => hidden', animate('500ms ease-out'))
    ])
  ]
})
export class PanelPresenciaComponent implements OnInit {

  sidebarState = 'hidden';

  constructor(private presenciaService: PresenciaService) {}

  ngOnInit(): void {
    this.presenciaService.verificarPermiso();
    setTimeout(() => {
      this.sidebarState = 'visible';
    }, 100);
  }

}
