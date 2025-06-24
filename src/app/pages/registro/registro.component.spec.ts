import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { ComponentsModule } from 'src/app/components/layout/components.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      imports: [ComponentsModule,ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => null,
              },
            },
            params: of({}),
            queryParams: of({}),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario invalido con todos los campos vacios', () => {
    expect(component.registroForm.valid).toBeFalsy();
  });

  it('Validar username', () => {
    let username = component.f['username'];
    expect(username.valid).toBeFalsy();

    username.setValue('');
    expect(username.hasError('required')).toBeTruthy();

    username.setValue('usuario');
    expect(username.hasError('required')).toBeFalsy();
  });

  it('Validar correo Valido', () => {
    let correo = component.f['correo'];
    correo.setValue('invalidEmail');
    expect(correo.hasError('email')).toBeTruthy();

    correo.setValue('correo@valido.com');
    expect(correo.hasError('email')).toBeFalsy();
  });

  it('Validar que contraseñas sean iguales', () => {
    const password = component.f['password'];
    const confirmPassword = component.f['confirmPassword'];
    password.setValue('123456');
    confirmPassword.setValue('123456');
    component.registroForm.updateValueAndValidity();
  
    expect(component.registroForm.hasError('notSame')).toBeFalse();

    password.setValue('123')
    component.registroForm.updateValueAndValidity();
    expect(component.registroForm.hasError('notSame')).toBeTrue();
  });

  it('Formulario invalido para personas menores de 13', () => {
    const fechaMenor = new Date();
    fechaMenor.setFullYear(fechaMenor.getFullYear() - 10);
  
    component.f['fecNacimiento'].setValue(fechaMenor.toISOString().substring(0, 10));
    component.f['fecNacimiento'].markAsTouched();
    component.registroForm.updateValueAndValidity();
  
    expect(component.f['fecNacimiento'].hasError('minAge')).toBeTrue();
    expect(component.registroForm.valid).toBeFalse();
  });
  
  it('Formulario valido para mayores de 13', () => {
    const fechaMayor = new Date();
    fechaMayor.setFullYear(fechaMayor.getFullYear() - 15);
  
    component.f['fecNacimiento'].setValue(fechaMayor.toISOString().substring(0, 10));
    component.f['fecNacimiento'].markAsTouched();
    component.registroForm.updateValueAndValidity();
  
    expect(component.f['fecNacimiento'].hasError('minAge')).toBeFalsy();
  });
});
