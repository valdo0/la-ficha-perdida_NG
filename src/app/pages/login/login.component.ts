import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
/**
 * @desscription
 * Componente de inicio de sesión que permite a los usuarios autenticarse en la aplicación.
 * Utiliza un formulario reactivo para capturar las credenciales del usuario y valida su autenticidad
 * a través del servicio de autenticación.
 * Si las credenciales son correctas, redirige al usuario a la página de inicio.
 * Si las credenciales son incorrectas, muestra un mensaje de error.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
/**
 * @description
 * Componente de inicio de sesión que permite a los usuarios autenticarse en la aplicación.
 * Maneja la validación del formulario y la interacción con el servicio de autenticación.
 */
export class LoginComponent {
  /**
   * @description
   * Formulario reactivo para el inicio de sesión.
   * Contiene los campos de nombre de usuario y contraseña con sus validaciones.
   * @type {FormGroup}
   */
  loginForm!: FormGroup;
  /**
   * @description
   * Propiedades para almacenar el nombre de usuario y la contraseña ingresados por el usuario.
   * También incluye un mensaje de error para mostrar al usuario en caso de fallos en el inicio de sesión.
   * @type {string}
   */
  username: string = '';
  /**
   * @description
   * Contraseña ingresada por el usuario.
   * @type {string}
   */
  password: string = '';
  /**
   * @description
   * Mensaje de error que se muestra al usuario en caso de que el inicio de sesión falle.
   * @type {string}
   */
  errorMsg: string = '';
  /**
   * @description
   * Constructor del componente LoginComponent.
   * Inicializa el servicio de autenticación, el enrutador y el formulario reactivo.
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
   * Inicializa el formulario de inicio de sesión con validaciones.
   * Se ejecuta al cargar el componente.
   * @returns void
   */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  /**
   * @description
   * Método que se ejecuta al enviar el formulario de inicio de sesión.
   * Valida los campos y llama al servicio de autenticación.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido a La Ficha Perdida',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/home']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Correo o contraseña incorrectos.',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  get f() {
    return this.loginForm.controls;
  }
}
