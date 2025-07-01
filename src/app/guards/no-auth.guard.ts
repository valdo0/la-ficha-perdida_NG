import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

/**
 * @function noAuthGuard
 * @name noAuthGuard
 * @description
 * Guard que verifica si el usuario no está autenticado.
 * ...
 */
export const noAuthGuard: CanActivateFn = (route, state) => {
  /**
   * @description
   * Inyecta el servicio de autenticación y el enrutador para verificar el estado de la sesión del usuario.
   * Si el usuario no está autenticado, permite el acceso a la ruta.
   * Si el usuario está autenticado, redirige al usuario a la página de inicio.
   */
  const authService = inject(AuthService);
  /**
   * @description
   * Inyecta el servicio de enrutamiento para redirigir al usuario si es necesario.
   */
  const router = inject(Router);
  /**
   * @description
   * Obtiene la sesión del usuario actual desde el servicio de autenticación.
   */
  const usuario = authService.getSesion();
  /**
   * @description
   * Verifica si el usuario no está autenticado.
   * Si no hay un usuario en sesión, permite el acceso a la ruta.
   * Si hay un usuario en sesión, redirige al usuario a la página de inicio (`/home`).
   * @returns `true` si el usuario no está autenticado, lo que permite el acceso a la ruta.
   *          `false` si el usuario está autenticado, lo que redirige al usuario a `/home`.
   */
  if (!usuario) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
