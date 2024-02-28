import { Component, inject } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RegistroService}from "../../servicios/registro.service";
import { Registro } from '../../interface/registro';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Token } from '@angular/compiler';

const jwtHelperService =new JwtHelperService();

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  router = inject(Router);
  toastrService = inject(ToastrService);
  registroService:RegistroService = inject(RegistroService);

    // uso de formulario reactivo de Registro
  formularioRegistro = new FormGroup({
    usuario:new FormControl("",Validators.required),
    nombre:new FormControl("",Validators.required),
    correo:new FormControl("",Validators.required),
    contrasenia:new FormControl("",Validators.required),
  }); 
  manejarEnvio(){
    console.log("click... del boton");
 if (this.formularioRegistro.valid){

    const usuario = this.formularioRegistro.value.usuario;
    const nombre = this.formularioRegistro.value.nombre;
    const correo = this.formularioRegistro.value.correo;
    const contrasenia = this.formularioRegistro.value.contrasenia;
   
    if (typeof usuario === "string" && typeof nombre=== "string"
     && typeof correo === "string" && typeof contrasenia ==="string"
    ){
        const credenciales: Registro = {
        usuario,
        nombre,
        correo,
        contrasenia
              };
  this.registroService.registro(credenciales).subscribe((respuesta:any)=>{
    console.log(respuesta);
    this.router.navigate(["/logueo"])
        });
      }
    } 
  } 
}




