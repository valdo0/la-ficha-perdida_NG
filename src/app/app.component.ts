import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
/**
 * @description
 * Componente principal de la aplicación Angular.
 * Contiene la lógica y la estructura básica de la aplicación.
 * Este componente se encarga de inicializar la aplicación y gestionar la autenticación del usuario.
 * Utiliza el servicio de autenticación para verificar el estado del usuario y manejar la sesión.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * @description 
 * Componente principal de la aplicación.
 * Este componente se encarga de inicializar la aplicación y gestionar la autenticación del usuario.
 * Utiliza el servicio de autenticación para verificar el estado del usuario y manejar la sesión.
 * @example
 * <app-root></app-root>
 */
export class AppComponent {
  /**
   * @description
   * Título de la aplicación.
   * Este título se muestra en la barra de título del navegador y en la interfaz de usuario.
   * @type {string}
   * @default 'La Ficha Perdida'
   */
  constructor(private authService:AuthService){}
  /**
   * @description
   * Título de la aplicación.
   * Este título se muestra en la barra de título del navegador y en la interfaz de usuario.
   * @type {string}
   * @default 'La Ficha Perdida'
   */
  title = 'La Ficha Perdida';
}
