import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LogueoService } from '../servicios/logueo.service';

export const activarGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const logueoService = inject(LogueoService);

  if (logueoService.inicioLogueo()) {
    return true;
  } else {
    router.navigateByUrl('/logueo');
    return false;
  }
};