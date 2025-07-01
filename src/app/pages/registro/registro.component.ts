import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  minAgeValidator,
  passwordsIgualesValidator,
} from 'src/app/validators/custom-validators';
import Swal from 'sweetalert2';
/**
 *  @description
 * Componente para el registro de usuarios en la aplicación.
 * Permite a los usuarios crear una cuenta proporcionando su información personal y credenciales.
 * Utiliza un formulario reactivo para capturar los datos del usuario y validar los campos.
 * Al enviar el formulario, se registra al usuario a través del servicio de autenticación.
 * Muestra mensajes de éxito o error según el resultado del registro.
 */
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
/**
 * @description
 * Componente para el registro de usuarios.
 * Utiliza un formulario reactivo para capturar los datos del usuario.
 * Valida los campos del formulario y muestra mensajes de error si es necesario.
 * Al enviar el formulario, registra al usuario a través del servicio de autenticación.
 * Muestra un mensaje de éxito al completar el registro y redirige al usuario a la página de inicio de sesión.
 */
export class RegistroComponent {
  /**
   * @description
   * Formulario reactivo para el registro de usuarios.
   * Contiene campos como username, nombre, fecha de nacimiento, dirección, correo y contraseña.
   */
  registroForm!: FormGroup;
  /**
   * @description
   * Propiedades para almacenar los datos del formulario de registro.
   * Incluyen username, nombre, fecha de nacimiento, dirección, correo y contraseña.
   */
  username: string = '';
  /**
   * @description
   * Nombre del usuario.
   * Este campo es obligatorio y se valida para asegurarse de que no esté vacío.
   * @type {string}
   * @default ''
   * @example 'Juan Perez'
   */
  nombre: string = '';
  /**
   * @description
   * Fecha de nacimiento del usuario.
   * Este campo es obligatorio y se valida para asegurarse de que el usuario tenga al menos 13 años.
   * @type {string}
   * @default ''
   * @example '2000-01-01'
   */
  fecNacimiento: string = '';
  /**
   * @description
   * Dirección del usuario.
   * Este campo es opcional y puede dejarse vacío.
   * @type {string}
   * @default ''
   * @example 'Calle Falsa 123'
   */
  direccion: string = '';
  /**
   * @description
   * Correo electrónico del usuario.
   * Este campo es obligatorio y se valida para asegurarse de que tenga un formato de correo electrónico válido.
   * @type {string}
   * @default ''
   * @example 'asd@asd.cl'
   */
  correo: string = '';
  /**
   * @description
   * Contraseña del usuario.
   * Este campo es obligatorio y se valida para asegurarse de que tenga una longitud mínima de 6 caracteres y máxima de 18.
   * @type {string}
   * @default ''
   * @example 'password123'
   */
  password: string = '';
  /**
   * @description
   * Confirmación de la contraseña del usuario.
   * Este campo es obligatorio y se valida para asegurarse de que coincida con el campo de contraseña.
   * @type {string}
   * @default ''
   * @example 'password123'
   */
  confirmPassword: string = '';

  /**
   * @description
   * Constructor del componente RegistroComponent.
   * Inicializa el formulario reactivo y los servicios necesarios.
   * @param authService 
   * @param router 
   * @param fb 
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  /**
   * @description
   * Método que se ejecuta al inicializar el componente.
   * Crea el formulario reactivo con sus respectivos controles y validaciones.
   * Utiliza el FormBuilder para definir los controles del formulario y sus validaciones.
   * @returns {void}
   */
  ngOnInit(): void {
    this.registroForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        fecNacimiento: ['', [Validators.required, minAgeValidator(13)]],
        direccion: [''],
        correo: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: passwordsIgualesValidator,
      }
    );
  }
  /**
   * @description
   * Maneja el envío del formulario de registro.
   * Valida el formulario y, si es válido, registra al usuario.
   * Muestra un mensaje de éxito y redirige al usuario a la página de inicio de sesión.
   */
  onSubmit() {
    if (this.registroForm.valid) {
      const { username, nombre, fecNacimiento, direccion, correo, password } =
        this.registroForm.value;
      if (
        this.authService.registrarUsuario(
          username,
          nombre,
          fecNacimiento,
          direccion,
          correo,
          password
        )
      ) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Usuario registrado correctamente.',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.registroForm.reset();
          this.router.navigate(['/login']);
        });
      }
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
  /**
   * @description
   * Obtiene los controles del formulario de registro.
   * Permite acceder a los controles del formulario de manera más sencilla en la plantilla.
   * @returns {any} Los controles del formulario de registro.
   * @example
   * this.f.username.value // Obtiene el valor del campo username del formulario.
   */
  get f() {
    return this.registroForm.controls;
  }
  /**
   * @description
   * Verifica si el campo de nombre de usuario es inválido y ha sido tocado.
   * @returns {boolean} Verdadero si el campo es inválido y ha sido tocado, falso en caso contrario.
   * */

  get passwordsNoSonIguales() {
    return (
      this.registroForm.hasError('notSame') && this.f['confirmPassword'].touched
    );
  }
}
