import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Productos } from '../interface/productos';
 

@Injectable({
  providedIn: 'root', 
})
export class ProductosService {
  constructor() {}

  API_URL:string = "http://localhost:4100/productos";
  httpClient = inject(HttpClient);

// creo todas las funciones crud 

crear(producto:Productos){
 const payload = {
  nombre:producto.nombre,
  tipo:producto.tipo,
  codigo:producto.codigo,
  disponible:producto.disponible
 }  
return this.httpClient.post(this.API_URL,payload);
}

leerTodos(){
return this.httpClient.get(this.API_URL);
//console.log(this.httpClient)
}

leer(id: string){
return this.httpClient.get(this.API_URL+"/"+id);
}
actualizar(id: string,producto:Productos){
  console.log("XXXXX",id,producto)

return this.httpClient.put(`${this.API_URL}/${producto._id}`,producto)
}

eliminar(id:string){
  return this.httpClient.delete(this.API_URL +"/"+ id); //se puede meter en "({this.}/${id}"
}
}
