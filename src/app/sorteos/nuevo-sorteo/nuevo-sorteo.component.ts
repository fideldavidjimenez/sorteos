import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConstantesService} from '../../shared/servicios/constantes.service';
import {Sorteo} from '../../dto/Sorteo';
import {SorteosService} from '../../shared/servicios/sorteos.service';
import {Jugada} from '../../dto/Jugada';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription, timer} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {JugarSorteoDialogComponent} from '../jugar-sorteo-dialog/jugar-sorteo-dialog.component';
import {PagarSorteoDialogComponent} from '../pagar-sorteo-dialog/pagar-sorteo-dialog.component';

@Component({
  selector: 'app-nuevo-sorteo',
  templateUrl: './nuevo-sorteo.component.html',
  styleUrls: ['./nuevo-sorteo.component.css']
})
export class NuevoSorteoComponent implements OnInit, AfterViewInit {

  static SEGUNDOS_SORTEO = 3.8;

  formGroup: FormGroup = this.formBuilder.group({});
  nInicial: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(999)]);
  nFinal: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(999)]);
  descripcion = new FormControl();
  premio = new FormControl(0, [Validators.min(0)]);

  sorteo: Sorteo = new Sorteo();

  columnsToDisplay = ['n_jugado', 'valor_pagado', 'fecha'];
  dataJugadas = new MatTableDataSource<Jugada>([]);

  digito0: number = 0;
  digito1: number = 0;
  digito2: number = 0;
  resultado: number = -1;

  // @ts-ignore
  subscription: Subscription;
  instanteInicial = 0;
  jugando = false;
  // @ts-ignore
  jugada: Jugada;
  // @ts-ignore
  private dialogRef: MatDialogRef<JugarSorteoDialogComponent, any>;
  // @ts-ignore
  private dialogPagarRef: MatDialogRef<PagarSorteoDialogComponent, any>;

  constructor(
    public constantesService: ConstantesService,
    public sorteosService: SorteosService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataJugadas.sort = this.sort;
  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      nInicial: this.nInicial,
      nFinal: this.nFinal,
      descripcion: this.descripcion,
    });

    this.sorteo.id_sorteo = -1;

  }

  crear(): void {

    this.sorteo = {
      id_sorteo: this.sorteosService.getIdSorteo() + 1,
      n_inicial: this.formGroup.controls.nInicial.value,
      n_final: this.formGroup.controls.nFinal.value,
      fecha: new Date(),
      descripcion: this.formGroup.controls.descripcion.value,
      jugadas: []
    }

    if (this.sorteo.id_sorteo) {
      this.sorteosService.guardarSorteo(this.sorteo);
    } else {
      throw new Error('error id');
    }

  }

  jugar(): void {

    this.jugando = true;

    let jugados: number[] = this.sorteo.jugadas.map(v => v.n_jugado);

    if (jugados.length >= (this.sorteo.n_final - this.sorteo.n_inicial + 1)) {
      this.resultado = -1;
      this.jugando = false;
      return;
    }

    do {

      this.resultado = Math.floor(Math.random() * (this.sorteo.n_final - this.sorteo.n_inicial + 1)) + this.sorteo.n_inicial;

    } while (this.resultado < this.sorteo.n_inicial || this.resultado > this.sorteo.n_final || jugados.includes(this.resultado));

    this.instanteInicial = Date.now();
    this.subscription = timer(0, 60).subscribe(() => this.cambiarNumeros());
    this.playAudio();

    this.jugada = {
      fecha: new Date(),
      ganador: "",
      premio: this.dialogRef.componentInstance.premio.value,
      n_jugado: this.resultado,
      valor_pagado: 0
    }

  }

  playAudio(): void {
    let audio = new Audio('assets/sounds/random.mp3');
    audio.load();
    audio.play();
  }

  abrirPagarDialog(): void {
    this.dialogPagarRef = this.dialog.open(PagarSorteoDialogComponent, {
      width: '500px',
      data: this.premio.value
    });

    this.dialogPagarRef.afterClosed().subscribe((r) => {

      if (this.dialogPagarRef.componentInstance.pagado) {
        this.pagar();
      }

      if (this.dialogPagarRef.componentInstance.cancelado) {
        this.cancelarPagar();
      }
    });
  }

  pagar(): void {

    this.jugada.ganador = this.dialogPagarRef.componentInstance.nombreGanador.value;
    this.jugada.valor_pagado = this.dialogPagarRef.componentInstance.valorPagado.value;

    this.sorteosService.guardarJugada(this.sorteo.id_sorteo, this.jugada);
    this.dataJugadas = new MatTableDataSource<Jugada>(this.sorteo.jugadas);

  }

  cancelarPagar(): void {
  }

  reset(): void {
    this.digito0 = 0;
    this.digito1 = 0;
    this.digito2 = 0;
    this.dataJugadas = new MatTableDataSource<Jugada>([]);
  }

  cambiarNumeros(): void {

    let dif = (Date.now() - this.instanteInicial) / (1000.0);

    if (dif >= NuevoSorteoComponent.SEGUNDOS_SORTEO) {
      this.subscription.unsubscribe();
      this.numeroADigitos(this.resultado);
      this.terminarRandom();
    } else {
      this.digito2 = this.numeroRandom();
      this.digito1 = this.numeroRandom();
      this.digito0 = this.numeroRandom();
    }

  }

  terminarRandom(): void {
    this.jugando = false;
  }

  numeroADigitos(numero: number): void {

    this.digito0 = (numero % 10);
    this.digito1 = ((numero - this.digito0) / 10) % 10;
    this.digito2 = ((numero - (this.digito0 + this.digito1 * 10)) / 100) % 10;

  }

  numeroRandom(): number {
    return Math.trunc(Math.random() * 10);
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(JugarSorteoDialogComponent, {
      width: '300px',
      data: this.premio.value
    });

    this.dialogRef.componentInstance.onJugar().subscribe(() => {
      this.jugar();
    });

    this.dialogRef.afterClosed().subscribe(result => {

    });

  }

}
