import {Component, Inject, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConstantesService} from '../../shared/servicios/constantes.service';
import {Jugada} from '../../dto/Jugada';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-pagar-sorteo-dialog',
  templateUrl: './pagar-sorteo-dialog.component.html',
  styleUrls: ['./pagar-sorteo-dialog.component.css']
})
export class PagarSorteoDialogComponent implements OnInit {

  // @ts-ignore
  private onPagar$ = new Subject();
  cancelado = false;
  pagado = false;

  constructor(public dialogRef: MatDialogRef<PagarSorteoDialogComponent>,
              public constantesService: ConstantesService,
              @Inject(MAT_DIALOG_DATA)  public data: any) {
  }

  nombreGanador = new FormControl('');
  valorPagado = new FormControl('', [Validators.required, Validators.min(0)]);

  ngOnInit(): void {
    this.cancelado = false;
    this.pagado = false;
  }

  pagar(): void {
    this.dialogRef.close();
    this.pagado = true;
  }

  cancelarPagar(): void {
    this.dialogRef.close();
    this.nombreGanador.setValue('');
    this.valorPagado.setValue(0);
    this.cancelado = true;
  }

  onPagar(): Observable<any> {
    return this.onPagar$.asObservable();
  }

}
