import { Routes } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { LogueoComponent } from './componentes/logueo/logueo.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { activarGuard } from './guards/activar.guard'; // canActivate:[activarGuard]


export const routes: Routes = [
    {path:"inicio",component:InicioComponent,title:"Inicio" },
    {path: "logueo", component:LogueoComponent,title:"Logueo"},
    {path:"productos", component:ProductosComponent, title:"Productos"},  
    {path:"registro",component:RegistroComponent, title:"Registro"},

    {path: '', redirectTo: "inicio", pathMatch: "full" },
    {path: '**', component: NoEncontradoComponent, title: "Error 404"},
    
];
