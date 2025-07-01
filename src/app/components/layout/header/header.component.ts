import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
/**
 * @description
 * Este componente representa el navbar de la aplicación.
 * Es responsable de mostrar información o enlaces relevantes en la parte superiro de la interfaz de usuario.
 *
 * @selector app-header
 * @example
 * <app-header></app-header>
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
/**
 * @class HeaderComponent
 * @description
 * Clase que representa el componente de encabezado de la aplicación.
 * Maneja la navegación entre secciones y la autenticación del usuario.
 */
export class HeaderComponent {
  /**
   * @property {string} seccionActiva
   * @description
   * Representa la sección activa del encabezado.
   * Se utiliza para resaltar la sección actual en el menú de navegación.
   * Por defecto, está vacía.
   * @default ''
   */
  seccionActiva: string = '';
  /**
   * @property {any} usuario
   * @description
   * Representa el usuario autenticado en la aplicación.
   */
  usuario: any = null;
  /**
   * @property {string | null} seccionPendiente
   * @description
   * Almacena la sección a la que se desea navegar cuando se realiza una navegación desde una sección diferente.
   * Si es `null`, no hay sección pendiente.
   * Se utiliza para manejar la navegación suave a secciones específicas cuando el usuario está en una ruta diferente.
   * @default null
   */
  private seccionPendiente: string | null = null;
  /**
   * @description
   * Constructor del componente HeaderComponent.
   * Inicializa el componente y configura la suscripción a los eventos de navegación del router.
   * @param router
   * @param authService
   */
  constructor(private router: Router, private authService: AuthService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.seccionPendiente) {
          this.hacerScroll(this.seccionPendiente);
          this.seccionPendiente = null;
        }
      });
  }
  /**
   * @description
   * Método que se ejecuta al inicializar el componente.
   * Obtiene la información del usuario autenticado desde el servicio de autenticación.
   */
  ngOnInit(): void {
    this.usuario = this.authService.getSesion();
  }
  /**
   * @description
   * Método que se ejecuta al destruir el componente.
   * Limpia la información del usuario autenticado.
   */
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  /**
   * @description
   * Método que verifica si el usuario está autenticado.
   * @returns {boolean} `true` si el usuario está autenticado, `false` en caso contrario.
   * @example
   * ```typescript
   * if (this.isLoggedIn) {
   *   // El usuario está autenticado
   * } else {
   *   // El usuario no está autenticado
   * }
   * ```
   */
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  /**
   * @description
   * Método que redirige al usuario a la sección de contacto.
   * @param {Event} event - El evento de clic que se desencadena al hacer clic en el enlace de contacto.
   * @example
   * ```html
   * <a href="#" (click)="irAContacto($event)">Contacto</a>
   * ```
   */
  irAContacto(event: Event) {
    event.preventDefault();
    this.irASeccion('contacto');
  }
  /**
   * @description
   * Método que redirige al usuario a la sección de inicio.
   * @param {Event} event - El evento de clic que se desencadena al hacer clic en el enlace de inicio.
   * @example
   * ```html
   * <a href="#" (click)="irAInicio($event)">Inicio</a>
   * ```
   */
  logout() {
    this.authService.logout();
  }
  /**
   *@description
   * Método que redirige al usuario a la sección de inicio.
   * @param event
   */
  irAJuegos(event: Event) {
    event.preventDefault();
    this.irASeccion('juegos');
  }
  /**
   *@description
   * Método que redirige al usuario a la sección de inicio.
   * @param event
   */
  irANovedades(event: Event) {
    event.preventDefault();
    this.irASeccion('novedades');
  }
  /**
   *@description
   * Método que redirige al usuario a la sección de inicio.
   * @param id
   */
  private irASeccion(id: string) {
    if (this.router.url === '/') {
      this.hacerScroll(id);
    } else {
      this.seccionPendiente = id;
      this.router.navigate(['/']);
    }
  }
  /**
   *@description
   * Método que desplaza suavemente la vista hacia un elemento con el ID especificado.
   * @param id
   */
  private hacerScroll(id: string) {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
