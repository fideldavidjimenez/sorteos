import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NuevoSorteoComponent} from './nuevo-sorteo/nuevo-sorteo.component';
import {ConsultarSorteosComponent} from './consultar-sorteos/consultar-sorteos.component';


const routes: Routes = [
  {
    path: '',
    component: NuevoSorteoComponent
  },
  {
    path: 'nuevoSorteo',
    component: NuevoSorteoComponent
  },
  {
    path: 'sorteos',
    component: ConsultarSorteosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SorteosRoutingModule {
}
