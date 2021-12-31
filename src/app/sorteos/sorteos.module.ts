import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NuevoSorteoComponent} from './nuevo-sorteo/nuevo-sorteo.component';
import {ConsultarSorteosComponent} from './consultar-sorteos/consultar-sorteos.component';
import {SorteosRoutingModule} from './sorteos-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {JugarSorteoDialogComponent} from './jugar-sorteo-dialog/jugar-sorteo-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { PagarSorteoDialogComponent } from './pagar-sorteo-dialog/pagar-sorteo-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    NuevoSorteoComponent,
    ConsultarSorteosComponent,
    JugarSorteoDialogComponent,
    PagarSorteoDialogComponent
  ],
	imports: [
		CommonModule,
		SorteosRoutingModule,
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatCardModule,
		MatStepperModule,
		MatTableModule,
		MatSortModule,
		MatDialogModule,
		FormsModule,
		MatIconModule,
		MatPaginatorModule
	]
})
export class SorteosModule {
}
