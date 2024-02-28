import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Logueo } from '../interface/logueo';

@Injectable({
  providedIn: 'root'
})
export class LogueoService {
  constructor() {}
router = inject(Router);
httpClient = inject(HttpClient);
API_URL: string = "http://localhost:4100/logueo";


logueo(credenciales: Logueo){
  return this.httpClient.post(this.API_URL,credenciales);
}

validarToken(token: string) {
  return this.httpClient.get(`${this.API_URL}/${token}`);
}
inicioLogueo() {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
}
cerrarLogueo() {
  localStorage.removeItem('token');
  this.router.navigate(['/']);
}
}