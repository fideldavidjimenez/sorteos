import {Component, OnInit} from '@angular/core';
import {SorteosService} from '../shared/servicios/sorteos.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor(public sorteosService: SorteosService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    document.getElementById("dwLink").href = "data:text/json;charset=UTF-8," + document.getElementById("jsonContainer").innerHTML;
  }

}
