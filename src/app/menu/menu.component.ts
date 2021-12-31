import {Component, OnInit} from '@angular/core';
import {ConstantesService} from '../shared/servicios/constantes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    public constantesService: ConstantesService
  ) {
  }

  ngOnInit(): void {

  }

}
