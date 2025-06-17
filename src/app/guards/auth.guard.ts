import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const usuario = authService.getSesion();

  if (usuario && usuario.role === 'usuario') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
