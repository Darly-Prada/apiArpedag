import { Component,inject } from '@angular/core';
import { ReactiveFormsModule,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LogueoService } from '../../servicios/logueo.service';
import { Logueo } from '../../interface/logueo';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Token } from '@angular/compiler';

const jwtHelperService =new JwtHelperService();
 
@Component({
  selector: 'app-logueo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './logueo.component.html',
  styleUrl: './logueo.component.css'
})
export class LogueoComponent {
  router = inject(Router);
  toastrService = inject(ToastrService);
  logueoService:LogueoService = inject(LogueoService);
 //usuario:string =""; mostrarUsuario(){ alert("mostrarUsuario:" + this.usuario)}
// formularios reactivos
formularioLogueo = new FormGroup({
  usuario:new FormControl("",Validators.required),
  contrasenia:new FormControl("",Validators.required),
  //correo:new FormControl("",Validators.required),
});
manejarEnvio(){
  //console.log("click...");
if (this.formularioLogueo.valid){
  console.log(this.formularioLogueo.value.usuario);
  console.log(this.formularioLogueo.value.contrasenia);
  const nombre = this.formularioLogueo.value.usuario;
  const contrasenia=this.formularioLogueo.value.contrasenia;

if (typeof nombre ==="string" && 
    typeof contrasenia==="string"
  ){
    const credenciales: Logueo ={  
      nombre,
      contrasenia,
    };
    console.log(credenciales)
    this.logueoService
    .logueo(credenciales)
    .subscribe((respuesta:any)=>{
     // console.log(respuesta);
   if (respuesta.resultado === "bien"){
      const decodificado =jwtHelperService.decodeToken(
        respuesta.datos.token
        );
        //console.log(decodificado);
        localStorage.setItem("token",respuesta.datos.token);
        localStorage.setItem('data', JSON.stringify(decodificado));
        this.toastrService.success(respuesta.mensaje + " "+decodificado.nombre);
        this.router.navigateByUrl('/productos');
      }else {
       // console.log("uppsss falló");
       this.toastrService.error(respuesta.mensaje);
      }
      });
    }
  }
}
}
