import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import {HttpClientModule} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatInputModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatAutocompleteModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        ApiService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deveria buscar todos estados', async () => {
    spyOn(component, 'buscaEstados').and.callThrough();
    await component.buscaEstados();

    expect(component.buscaEstados).toHaveBeenCalled();
    expect(component.estados.length).toEqual(27);
  });

  it('deveria buscar um estado especifico', async () => {
    spyOn(component, 'buscaEstado').and.callThrough();
    await component.buscaEstados(); // Busca estados
    component.estadoControl.setValue('acre'); // Setou acre no campo
    let ret = await component.buscaEstado();
    expect(component.buscaEstado).toHaveBeenCalled();
    expect(ret.hasOwnProperty('nome')).toBeTruthy();
  });

  it('deveria não encontrar um estado', async () => {
    spyOn(component, 'buscaEstado').and.callThrough();
    await component.buscaEstados(); // Busca estados
    component.estadoControl.setValue('ufpel'); // Setou ufpel no campo
    let ret = await component.buscaEstado();
    expect(component.buscaEstado).toHaveBeenCalled();
    expect(ret).toBeUndefined();
  });

  it('deveria buscar todos municipios de um estado', async () => {
    spyOn(component, 'buscaMunicipios').and.callThrough();
    await component.buscaEstados();
    component.estadoControl.setValue('RS');
    await component.buscaMunicipios();
    expect(component.buscaMunicipios).toHaveBeenCalled();
    expect(component.municipios.length).toBeGreaterThan(0);
  });
});
