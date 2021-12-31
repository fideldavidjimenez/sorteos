import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfiguracionComponent} from './configuracion/configuracion.component';

const routes: Routes = [
  {
    path: 'sorteos',
    loadChildren: () => import('./sorteos/sorteos.module').then(m => m.SorteosModule)
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
