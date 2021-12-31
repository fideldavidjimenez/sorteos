import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConstantesService} from '../../shared/servicios/constantes.service';
import {Jugada} from '../../dto/Jugada';
import {FormControl, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-jugar-sorteo',
  templateUrl: './jugar-sorteo-dialog.component.html',
  styleUrls: ['./jugar-sorteo-dialog.component.css']
})
export class JugarSorteoDialogComponent implements OnInit {

  // @ts-ignore
  private onJugar$ = new Subject();

  constructor(public dialogRef: MatDialogRef<JugarSorteoDialogComponent>,
              public constantesService: ConstantesService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  premio = new FormControl(0, [Validators.min(0)]);

  ngOnInit(): void {
  }

  jugar(): void {
    this.onJugar$.next();
    this.dialogRef.close();
  }

  onJugar(): Observable<any> {
    return this.onJugar$.asObservable();
  }

}
