import {Jugada} from './Jugada';

export class Sorteo {
  id_sorteo: number = 0;
  n_inicial: number = 0;
  n_final: number = 0;
  fecha: Date = new Date();
  descripcion: string = "";
  jugadas: Jugada[] = [];
}
