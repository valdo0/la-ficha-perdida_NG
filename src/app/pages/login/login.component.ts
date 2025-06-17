import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  username: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "Bienvenido a La Ficha Perdida",
          confirmButtonText: "Aceptar"
            }).then(() => {
        this.router.navigate(['/home']);
      });
      ;
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de inicio de sesión",
          text: "Correo o contraseña incorrectos.",
          confirmButtonText: "Aceptar"
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
