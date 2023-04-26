import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient
  ) { }

  async getEstado(estado: any) {
    let ret = await this.http.get<any[]>(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}`).toPromise();
    return ret;
  }

  async getEstados() {
    let ret = await this.http.get<any[]>(`http://servicodados.ibge.gov.br/api/v1/localidades/estados`).toPromise();
    return ret;
  }

  async getMunicipios(estado: any) {
    let ret = await this.http.get<any[]>(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`).toPromise();
    return ret;
  }
}
