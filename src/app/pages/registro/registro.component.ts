import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm!: FormGroup;

  username: string = '';
  nombre:string ='';
  fecNacimiento:string='';
  direccion:string='';
  correo:string='';
  password: string = '';
  confirmPassword:string='';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required]],
      nombre:['',[Validators.required]],
      fecNacimiento:['',[Validators.required]],
      direccion:['',[Validators.required]],
      correo:['',[Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword:['',[Validators.required]]
    });
  }

  onSubmit(){
    if(this.registroForm.valid ){
      const { username, nombre,fecNacimiento,direccion,correo,password } = this.registroForm.value;
      if(this.authService.registrarUsuario(username,nombre,fecNacimiento,direccion,correo,password)){
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Usuario registrado correctamente.",
          confirmButtonText: "Aceptar"
      }).then(() => {
          this.registroForm.reset();
      });
      }

    }else{
      this.registroForm.markAllAsTouched();
    }
    
  }
  get f() {
    return this.registroForm.controls;
  }
}
