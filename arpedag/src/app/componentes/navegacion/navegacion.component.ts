import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogueoService } from '../../servicios/logueo.service';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent {
  logueoService = inject(LogueoService);

}
