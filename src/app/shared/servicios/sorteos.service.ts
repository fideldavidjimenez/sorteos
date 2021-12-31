import {Injectable} from '@angular/core';
import {Sorteo} from '../../dto/Sorteo';
import {DataBase} from '../../dto/DataBase';
import {ConstantesService} from './constantes.service';
import {Jugada} from '../../dto/Jugada';

@Injectable({
  providedIn: 'root'
})
export class SorteosService {

  db: DataBase = {
    fecha_actualizacion: new Date(),
    sorteos: []
  };

  constructor(public constantesService: ConstantesService) {

    let dbString = localStorage.getItem(constantesService.db);

    if (dbString) {
      this.db = JSON.parse(dbString);
    }
  }

  guardarSorteo(sorteo: Sorteo): void {

    this.db.sorteos.push(sorteo);
    this.db.fecha_actualizacion = new Date();

    localStorage.setItem(this.constantesService.db, JSON.stringify(this.db));
    // console.log(this.db);

  }

  guardarJugada(idSorteo: number, jugada: Jugada): void {

    this.db.sorteos.filter(s => s.id_sorteo == idSorteo)[0].jugadas.push(jugada);
    this.db.fecha_actualizacion = new Date();

    localStorage.setItem(this.constantesService.db, JSON.stringify(this.db));
    console.log(this.db);

  }

  getIdSorteo(): number {
    // @ts-ignore
    let r = this.db.sorteos.map(s => s.id_sorteo);
    let y = r.reduce(function (a, b) {
      return Math.max(a, b);
    }, 0);

    return y;
  }

}
