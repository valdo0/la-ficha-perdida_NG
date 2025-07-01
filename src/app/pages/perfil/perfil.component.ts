import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
/**
 * @description
 * Componente para gestionar el perfil del usuario.
 * Permite al usuario editar su nombre, email y dirección.
 * Valida los campos del formulario y actualiza los datos del perfil en el almacenamiento local.
 * Utiliza el servicio AuthService para obtener y actualizar los datos del perfil.
 * @example
 * <app-perfil></app-perfil>
 */
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
/**
 * @description
 * Componente para gestionar el perfil del usuario.
 * Permite al usuario editar su nombre, email y dirección.
 * Valida los campos del formulario y actualiza los datos del perfil en el almacenamiento local.
 */
export class PerfilComponent implements OnInit {
  /**
   * @description
   * Formulario reactivo para editar el perfil del usuario.
   * Contiene campos para nombre, email y dirección, todos requeridos.
   * Utiliza validaciones para asegurar que los datos ingresados sean correctos.
   * @type {FormGroup}
   */
  perfilForm: FormGroup;
  /**
   * @description
   * Datos del perfil del usuario obtenidos del servicio AuthService.
   * Se utiliza para prellenar el formulario de edición de perfil.
   * @type {any}
   */
  perfilData: any;
  /**
   * @description
   * Suscripción para manejar la limpieza de recursos y evitar fugas de memoria.
   * Se utiliza para suscribirse a eventos o servicios que puedan emitir datos.
   * @type {Subscription}
   */
  private subscription: Subscription = new Subscription();
/**
 * @description
 * Constructor del componente PerfilComponent.
 * Inicializa el formulario reactivo con los campos necesarios y sus validaciones.
 * @param fb 
 * @param authService 
 */
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
    });
  }
/**
 * @description
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
 * Obtiene los datos del perfil del usuario desde el servicio AuthService
 */
  ngOnInit(): void {
    this.perfilData = this.authService.getPerfil();
    console.log('Datos del perfil:', this.perfilData);
    if (this.perfilData) {
      this.perfilForm.patchValue({
        nombre: this.perfilData.nombre || '',
        email: this.perfilData.email || '',
        direccion: this.perfilData.direccion || '',
      });
    }
  }
/**
 * @description
 * Maneja el envío del formulario de edición de perfil.
 * Valida el formulario y, si es válido, actualiza los datos del perfil en el almacenamiento local.
 * Cierra el modal de edición de perfil y muestra los datos actualizados en la consola.
 */
  guardarCambios() {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    const datosActualizados = this.perfilForm.value;

    const sesion = this.authService.getSesion();
    if (sesion) {
      sesion.nombre = datosActualizados.nombre;
      sesion.email = datosActualizados.email;
      sesion.direccion = datosActualizados.direccion;
      localStorage.setItem('sesion', JSON.stringify(sesion));

      const usuarios = this.authService.getAllUsers();
      if (usuarios) {
        const index = usuarios.findIndex(
          (u: any) => u.username === sesion.usuario
        );
        if (index !== -1) {
          usuarios[index].nombre = datosActualizados.nombre;
          usuarios[index].email = datosActualizados.email;
          usuarios[index].direccion = datosActualizados.direccion;
          localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
      }
    }

    this.perfilData = { ...this.perfilData, ...datosActualizados };

    const modalElement = document.getElementById('modalEditarPerfil');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }

    console.log('Perfil actualizado:', this.perfilData);
  }
}
