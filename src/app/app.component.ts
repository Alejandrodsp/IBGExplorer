import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  estados: any = [];
  municipios: any = [];
  estadoControl = new FormControl('');
  estado: any;
  displayedColumns: string[] = ['nome'];
  nodatabase: boolean = false;
  filteredOptions: Observable<any[]>;
  constructor(
    private api: ApiService
  ) {
    this.filteredOptions = this.estadoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
   }
  ngOnInit() {
    this.buscaEstados();
  }

  async buscaEstados() {
    this.estados = await this.api.getEstados();
    this.estados = this.estados.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
    this.estadoControl.setValue('');
  }

  buscaEstado() {
    let estado = this.estados.find((estado: any) => 
      (estado.nome.toLocaleUpperCase() === this.estadoControl.value.toLocaleUpperCase()) ||
      (estado.sigla.toLocaleUpperCase() === this.estadoControl.value.toLocaleUpperCase())
    );
    return estado;
  }

  async buscaMunicipios() {
    this.estado = this.buscaEstado();
    this.municipios = await this.api.getMunicipios(this.estado?.sigla);
    this.nodatabase = !this.municipios.length ? true : false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.estados.filter((option: any) => option.nome.toLowerCase().includes(filterValue) || option.sigla.toLowerCase().includes(filterValue));
  }
}
