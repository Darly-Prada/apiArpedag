import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Registro } from '../interface/registro';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  constructor() { }

  router = inject(Router);
  httpClient = inject(HttpClient);
  API_URL: string = "http://localhost:4100/registros";


  registro(credenciales: Registro){
    return this.httpClient.post(this.API_URL,credenciales)
  }
}
