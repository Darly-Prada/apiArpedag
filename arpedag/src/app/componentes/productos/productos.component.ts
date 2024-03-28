import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LogueoService } from '../../servicios/logueo.service';
import { ProductosService } from '../../servicios/productos.service';
import { Productos } from '../../interface/productos';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports:[FormsModule],     
  templateUrl:'./productos.component.html',
  styleUrl: './productos.component.css',
})

export class ProductosComponent {
  toastrService =inject(ToastrService);
  logueoService = inject(LogueoService);
  productoService = inject(ProductosService);
  router = inject(Router);
  
  productoInicial: Productos = {
    _id:"",
    nombre: '',
    tipo: '',
    codigo: '',
    disponible:true,
  };
  producto: Productos = this.productoInicial;

todosLosProductos:any[] = [];
contenidoParaMostrar: any []=[];

modalTitulo: string = '';
modalBoton: string = '';
modalColorBoton: string = '';
productoId: string = '';
nombreProducto: string = '';

  restablecerPropiedades() {
    this.modalTitulo = '';
    this.modalBoton = '';
    this.modalColorBoton = '';
    this.productoId = '';
    this.producto = this.productoInicial;
  }
// metodo crear 
  manejarAccion() {
    if (this.modalBoton === 'Crear') {
   console.log(this.producto)
      this.productoService
        .crear(this.producto)
        .subscribe((respuesta: any) => {
      console.log(respuesta);
      if (respuesta.resultado === 'Está bien') {
            this.restablecerPropiedades();
            this.obtenerTodos();
            this.toastrService.success(respuesta.mensaje);
    } else {
            this.toastrService.error(respuesta.mensaje);
          }
        });
    } else if (this.modalBoton === 'Actualizar') {
      this.productoService
        .actualizar(this.productoId, this.producto)
        .subscribe((respuesta: any) => {
          if (respuesta.resultado === 'Está bien') {
            this.restablecerPropiedades();
            this.obtenerTodos();
            this.toastrService.success(respuesta.mensaje);
          } else {
            this.toastrService.error(respuesta.mensaje);
          }
        });        
    } else if (this.modalBoton === 'Eliminar') {      
      this.productoService
      .eliminar(this.productoId)        
      .subscribe((respuesta: any) => { 
        console.log(respuesta);      
          if (respuesta.resultado === 'Está bien') {
            console.log(respuesta);
            this.restablecerPropiedades();
            this.obtenerTodos();        //  this.router.navigate(["/productos"]) 
            this.toastrService.warning(respuesta.mensaje);
          } else {
            this.toastrService.error(respuesta.mensaje);
          }
        });
          }
  }
  mostrarModalAgregar() {
    this.modalTitulo = 'Agregar';
    this.modalBoton = 'Crear';
    this.modalColorBoton = 'success';
  }
  mostrarModalVer(producto: Productos) {
    this.productoInicial= producto
    console.log("pruebas", producto);
    this.modalTitulo = "Inventario del Producto";
    this.modalBoton = "Ver";
    this.modalColorBoton = 'outline-light';
    const productoId = producto._id; // Use the _id from the passed product object
  
    this.productoService.leer(this.productoId).subscribe((respuesta: any) => {
      
     // console.log("rta datos ", respuesta.datos);
       if (respuesta.resultado === 'Está bien') {
        // Assuming respuesta.datos directly contains the product object
        this.producto = respuesta.datos;
        console.log("Rta this productossss", this.producto);
        
        this.toastrService.info(respuesta.mensaje);
      } else {
        this.toastrService.error(respuesta.mensaje);
      }
    });
  }
  mostrarModalEditar(producto:Productos) {
    //console.log("pruebaaaaaassss ",producto)
    this.productoInicial= producto
    this.modalTitulo = 'Actualizar datos';
    this.modalBoton = 'Actualizar';
    this.modalColorBoton ='warning';
    this.productoService.
    actualizar(this.productoId,producto).subscribe((respuesta: any) => {

      if (respuesta.resultado === 'Está bien') {
        this.producto = respuesta.datos;
        this.toastrService.warning(respuesta.mensaje);
      } else {
        this.toastrService.error(respuesta.mensaje);
      }
    });
  }
  mostrarModalEliminar(id:string) {
    this.productoId = id;
    console.log(this.producto)
    this.modalTitulo = "¿Eliminar registro?";
    this.modalBoton ="Eliminar";
    this.modalColorBoton = 'danger';
      
  }
  // revisando leerTodos 
  obtenerTodos() {
    this.productoService.leerTodos().subscribe((respuesta: any) => {
      console.log(respuesta); 
      if (respuesta.resultado === 'Está bien') {
        this.todosLosProductos = respuesta.datos;
        this.contenidoParaMostrar =respuesta.datos;
        this.toastrService.info(respuesta.mensaje);
      } else {
        this.toastrService.error(respuesta.mensaje);
      }
    });
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logueoService.validarToken(token).subscribe((respuesta: any) => {
        if (respuesta.resultado === 'bien') {
          this.nombreProducto = respuesta.datos.nombre;
          this.obtenerTodos();
        } else {
          this.logueoService.cerrarLogueo();
        }
      });
    } else {
      this.logueoService.cerrarLogueo()
    }
  }  
  buscar= {
    termino:"",
  }; 
buscador(){
  console.log(this.buscar.termino);
  const productoencontrado = this.todosLosProductos.filter((producto)=>{
  
    return producto.nombre === this.buscar.termino 
 }       
);
console.log(productoencontrado)
console.log(this.todosLosProductos)
  this.contenidoParaMostrar = productoencontrado;
}

}


 