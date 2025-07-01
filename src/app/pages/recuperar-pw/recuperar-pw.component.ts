import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
/**
 * @description
 * Componente para recuperar la contraseña de un usuario.
 * Permite al usuario ingresar su nombre de usuario y una nueva contraseña.
 * Valida que las contraseñas coincidan y actualiza la contraseña en el servicio de autenticación.
 * Muestra mensajes de éxito o error según el resultado de la operación.
 */
@Component({
  selector: 'app-recuperar-pw',
  templateUrl: './recuperar-pw.component.html',
  styleUrls: ['./recuperar-pw.component.css'],
})
/**
 * @description
 * Componente para recuperar la contraseña de un usuario.
 * Permite al usuario ingresar su nombre de usuario y una nueva contraseña.
 * Valida que las contraseñas coincidan y actualiza la contraseña en el servicio de autenticación.
 * Muestra mensajes de éxito o error según el resultado de la operación.
 */
export class RecuperarPwComponent {
  /**
   * @description
   * Formulario reactivo para la recuperación de contraseña.
   * Contiene campos para el nombre de usuario, la nueva contraseña y su confirmación.
   */
  recuperarForm!: FormGroup;
  /**
   * @description
   * Constructor del componente.
   * Inicializa el formulario y los servicios necesarios.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param authService - Servicio de autenticación para manejar la lógica de cambio de contraseña.
   * @param router - Router para navegar entre rutas.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
/**
 * @description
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
 * Crea el formulario reactivo con los campos necesarios y sus validaciones.  
 */
  ngOnInit(): void {
    this.recuperarForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', Validators.required],
      },
      {
        validators: this.passwordsIgualesValidator,
      }
    );
  }
  /**
   * @description
   * Valida que las contraseñas ingresadas sean iguales.
   * @param form - FormGroup que contiene los campos de contraseña.
   * @returns null si las contraseñas coinciden, o un objeto de error si no coinciden.
   */
  passwordsIgualesValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const pass2 = form.get('password2')?.value;
    return pass === pass2 ? null : { passwordsNoCoinciden: true };
  }
  /**
   * @description
   * Maneja el envío del formulario de recuperación de contraseña.
   * Valida el formulario y, si es válido, intenta cambiar la contraseña del usuario.
   * Si la operación es exitosa, muestra un mensaje de éxito y redirige al usuario a la página de inicio de sesión.
   * Si falla, muestra un mensaje de error.
   */
  onSubmit(): void {
    if (this.recuperarForm.invalid) {
      this.recuperarForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.recuperarForm.value;
    const success = this.authService.changePassword(username, password);

    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada',
        text: 'Tu contraseña ha sido modificada exitosamente',
        timer: 2000,
        showConfirmButton: false,
      });
      this.recuperarForm.reset();
      this.router.navigate(['/login']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Usuario no encontrado',
        text: 'No se pudo actualizar la contraseña. Verifica el nombre de usuario.',
      });
    }
  }
}
