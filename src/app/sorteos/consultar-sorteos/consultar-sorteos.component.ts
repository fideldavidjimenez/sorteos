import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Sorteo} from '../../dto/Sorteo';
import {SorteosService} from '../../shared/servicios/sorteos.service';
import {ConstantesService} from '../../shared/servicios/constantes.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-consultar-sorteos',
  templateUrl: './consultar-sorteos.component.html',
  styleUrls: ['./consultar-sorteos.component.css']
})
export class ConsultarSorteosComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['id_sorteo', 'n_i', 'n_f', 'jug', 'obs', 'fecha'];
  dataSorteos = new MatTableDataSource<Sorteo>([]);

  constructor(public sorteosService: SorteosService,
              public constantesService: ConstantesService) {
  }

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    // this.dataSorteos.data = this.sorteosService.db.sorteos.sort((a, b) => b.fecha ? b.fecha < a.fecha ? -1 : b.fecha > a.fecha ? 1 : 0 : 0);
  }

  ngAfterViewInit(): void {
    this.dataSorteos = new MatTableDataSource<Sorteo>(this.sorteosService.db.sorteos.sort((a, b) => b.fecha ? b.fecha < a.fecha ? -1 : b.fecha > a.fecha ? 1 : 0 : 0));
    this.dataSorteos.sort = this.sort;
    this.dataSorteos.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSorteos.filter = filterValue.trim().toLowerCase();
  }

}
