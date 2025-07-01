import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
/**
 * @description
 * Guard de autenticación que verifica si el usuario tiene una sesión activa y un rol de 'usuario'.
 * Si el usuario cumple con estas condiciones, se le permite acceder a la ruta solicitada.
 * En caso contrario, se redirige al usuario a la página de inicio de sesión.
 *
 * @param route - Información sobre la ruta que se está intentando activar.
 * @param state - Estado de la ruta que se está intentando activar.
 * @returns `true` si el usuario tiene una sesión válida y el rol adecuado, de lo contrario, redirige al usuario y retorna `false`.
 *
 * @example
 * ```typescript
 * // Uso en el módulo de rutas
 * const routes: Routes = [
 *   {
 *     path: 'ruta-protegida',
 *     component: ComponenteProtegido,
 *     canActivate: [authGuard]
 *   }
 * ];
 * ```
 */
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
