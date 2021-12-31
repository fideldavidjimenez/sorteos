import {Sorteo} from './Sorteo';

export interface DataBase {
  fecha_actualizacion: Date;
  sorteos: Sorteo[];
}
