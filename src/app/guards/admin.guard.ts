import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

/**
 * @description
 * Guard que verifica si el usuario tiene el rol de administrador antes de permitir el acceso a una ruta protegida.
 * Si el usuario no tiene una sesión activa o no posee el rol de administrador, será redirigido a la página de inicio de sesión.
 *
 * @param route - Información sobre la ruta activada que se está intentando acceder.
 * @param state - Estado de la ruta que se está intentando cargar.
 * 
 * @returns
 * - `true` si el usuario tiene el rol de administrador.
 * - `false` si el usuario no tiene el rol de administrador, redirigiéndolo a la página de inicio de sesión.
 *
 * @example
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: 'admin',
 *     component: AdminComponent,
 *     canActivate: [adminGuard]
 *   }
 * ];
 * ```
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const usuario = authService.getSesion();

  if (usuario && usuario.role === 'admin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
