import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {

  public labels = {
    nInicial: "Número inicial",
    nFinal: "Número final",
    ok: "Aceptar",
    cancel: "Cancelar",
    nSorteo: "Nuevo Sorteo",
    cSorteo: "Consultar Sorteos",
    config: "Configuración",
    desc: "Descripción",
    jugar: "Jugar",
    tSorteo: "Terminar Sorteo",
    premio: "Premio",
    nGanador: "Nombre ganador",
    vPagado: "Valor pagado",
    pagar: "Pagar"
  }

  public mensajes = {
    req: "Es requerido",
    num: "Debe ser un número",
    max: "Máximo 3 dígitos"
  }

  db = "dbSorteos";

  constructor() {
  }
}
