import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-panel-inventario',
  templateUrl: './panel-inventario.component.html',
  styleUrls: ['./panel-inventario.component.css'],
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

export class PanelInventarioComponent implements OnInit {

  sidebarState = 'hidden';

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.verificarPermiso();
    setTimeout(() => {
      this.sidebarState = 'visible';
    }, 100);
  }
}
